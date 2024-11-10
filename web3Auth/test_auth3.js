import { Web3Auth } from "@web3auth/web3auth";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import * as xrpl from "xrpl"; 

let web3auth;

async function initializeWeb3Auth() {
  web3auth = new Web3Auth({
    clientId: "BOlC5PNNPayQWXTvwMwrH_DDQLN460SSpzUYYnyHJpacblQSBjTpK6hPqspCG2VmREx3mI0DU9CD6YI45gSzzt0",  // Remplacez par votre client ID Web3Auth
    chainConfig: {
      chainNamespace: "other",  
      chainId: "",            
      rpcTarget: "",         
      displayName: "XRP Ledger",
      ticker: "XRP",
      tickerName: "XRP",
    },
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      network: "testnet", 
      uxMode: "popup",     
    },
  });

  web3auth.configureAdapter(openloginAdapter);

 
  await web3auth.initModal();
}

async function authenticateUser() {
  if (!web3auth) {
    throw new Error("Web3Auth n'est pas initialisé. Assurez-vous d'appeler initializeWeb3Auth d'abord.");
  }


  const provider = await web3auth.connect();


  const privateKeyHex = await provider.request({ method: "private_key" });

  const wallet = xrpl.Wallet.fromSeed(privateKeyHex);

  console.log("Adresse XRP Ledger de l'utilisateur:", wallet.classicAddress);

  return wallet;
}
document.getElementById("connectButton").addEventListener("click", function() {
    initializeWeb3Auth()
      .then(() => {
        console.log("Web3Auth initialisé avec succès.");
        return authenticateUser(); 
      })
      .then((wallet) => {
        console.log("Portefeuille XRP Ledger de l'utilisateur:", wallet);
      })
      .catch((error) => {
        console.error("Erreur lors de l'authentification de l'utilisateur :", error);
      });
  });
  