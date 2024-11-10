document.getElementById("confirmBooking").addEventListener("click", async () => {
  const selectedTicket = JSON.parse(localStorage.getItem("selectedTicket"));

  try {
    const response = await fetch("http://localhost:5000/api/create-escrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketPrice: selectedTicket.price,
        userId: selectedTicket.userId,
        ticketId: selectedTicket.id,
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message);

      // Redirect to confirmation page with ticketId in query string
      window.location.href = `confirmation-page.html?ticketId=${selectedTicket.id}`;
    } else {
      alert("Failed to process booking: " + result.error);
    }
  } catch (error) {
    console.error("Failed to connect or process booking:", error);
    alert("Failed to connect or process booking.");
  }
});
