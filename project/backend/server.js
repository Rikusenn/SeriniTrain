const express = require("express");
const xrpl = require("xrpl");
const cors = require("cors");
const crypto = require("crypto");
const cc = require("five-bells-condition");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

const walletDataStore = {};

async function connectClient() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

app.post("/api/create-escrow", async (req, res) => {
  const { ticketPrice, userId, ticketId } = req.body;

  try {
    await connectClient();

    const { wallet: userWallet } = await client.fundWallet();

    const preimageData = crypto.randomBytes(32);
    const fulfillment = new cc.PreimageSha256();
    fulfillment.setPreimage(preimageData);
    const condition = fulfillment.getConditionBinary().toString("hex").toUpperCase();

    const cancelAfter = Math.floor(Date.now() / 1000) + 24 * 60 * 60;

    const escrowTx = {
      TransactionType: "EscrowCreate",
      Account: userWallet.classicAddress,
      Destination: "rJTwqc1prCmCF2kM4qAsKdXZVufKodwQoP", // Testnet destination address
      Amount: xrpl.xrpToDrops(ticketPrice),
      Condition: condition,
      CancelAfter: cancelAfter,
    };

    const preparedTx = await client.autofill(escrowTx);
    const signedTx = userWallet.sign(preparedTx);
    const escrowResult = await client.submitAndWait(signedTx.tx_blob);

    if (escrowResult.result.meta.TransactionResult === "tesSUCCESS") {
      walletDataStore[ticketId] = {
        address: userWallet.classicAddress,
        balance: ticketPrice,
        escrowCondition: condition,
        escrowSequence: escrowResult.result.Sequence,
      };

      res.json({ status: "escrow_created", message: "Payment held in escrow. Booking confirmed!" });
    } else {
      res.status(500).json({ error: "Escrow creation failed", resultCode: escrowResult.result.meta.TransactionResult });
    }
  } catch (error) {
    console.error("Error creating escrow:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/wallet-info/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  const walletInfo = walletDataStore[ticketId];

  if (walletInfo) {
    res.json(walletInfo);
  } else {
    res.status(404).json({ error: "Wallet information not found for the provided ticket ID." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
