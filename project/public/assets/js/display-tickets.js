document.addEventListener("DOMContentLoaded", function () {
    const ticketsContainer = document.getElementById("tickets-container");
    const tickets = JSON.parse(localStorage.getItem("availableTickets")) || [];
  
    if (tickets.length === 0) {
      ticketsContainer.innerHTML = "<p>No tickets available. Please go back and search again.</p>";
      return;
    }
  
    tickets.forEach(ticket => {
      const ticketElement = document.createElement("div");
      ticketElement.classList.add("ticket-item", "p-3", "mb-3", "border", "rounded");
  
      ticketElement.innerHTML = `
        <h4>${ticket.company} - Train from ${ticket.departureCity} to ${ticket.arrivalCity}</h4>
        <p><strong>Date:</strong> ${ticket.date}</p>
        <p><strong>Departure Time:</strong> ${ticket.departureTime}</p>
        <p><strong>Price:</strong> $${ticket.price}</p>
        <p><strong>Ticket ID:</strong> ${ticket.id}</p>
        <button class="btn btn-primary select-ticket-btn" data-id="${ticket.id}">Select</button>
      `;
  
      ticketsContainer.appendChild(ticketElement);
    });
  
    // Event listener for selecting a ticket
    ticketsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("select-ticket-btn")) {
        const selectedTicketId = e.target.getAttribute("data-id");
        const selectedTicket = tickets.find(ticket => ticket.id === selectedTicketId);
  
        if (selectedTicket) {
          // Save the selected ticket details to localStorage
          localStorage.setItem("selectedTicket", JSON.stringify(selectedTicket));
          
          // Redirect to the booking confirmation or summary page
          window.location.href = "booking-summary.html";
        }
      }
    });
  });
  