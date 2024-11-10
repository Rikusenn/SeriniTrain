document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("train-search-form");

  // Génère les billets fictifs en fonction des paramètres de recherche
  function generateMockTickets(departureCity, arrivalCity, departureDate, chosenTime) {
    const ticketOptions = [];
    const basePrice = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // Prix de base entre 20 et 50
    const companies = ["FastRail", "TransExpress", "EcoTrain", "SpeedLine", "RailConnect"];

    for (let i = -2; i <= 2; i++) { // Génère les horaires autour de l'heure choisie
      const time = new Date(`${departureDate}T${chosenTime}`);
      time.setMinutes(time.getMinutes() + i * 30); // Décalage de ±30 minutes

      const ticket = {
        id: `TID${Date.now()}${Math.floor(Math.random() * 1000)}`, // Identifiant unique
        departureCity,
        arrivalCity,
        departureTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: departureDate,
        price: (basePrice + (Math.random() < 0.5 ? Math.floor(Math.random() * 10) : 0)).toFixed(2), // Variation du prix
        company: companies[Math.floor(Math.random() * companies.length)]
      };

      ticketOptions.push(ticket);
    }

    return ticketOptions;
  }

  // Sauvegarde les billets dans le localStorage et redirige vers tickets-results.html
  function saveTicketsAndRedirect(tickets) {
    localStorage.setItem("availableTickets", JSON.stringify(tickets));
    window.location.href = "tickets-results.html"; // Redirection vers la page des résultats
  }

  // Gestionnaire de soumission du formulaire
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    const departureCity = document.getElementById("departure-city").value.trim();
    const arrivalCity = document.getElementById("arrival-city").value.trim();
    const departureDate = document.getElementById("departure-date").value;
    const departureTime = document.getElementById("departure-time").value;

    if (!departureCity || !arrivalCity || !departureDate || !departureTime) {
      alert("Please fill in all required fields.");
      return;
    }

    // Génère les billets et redirige vers tickets-results.html
    const mockTickets = generateMockTickets(departureCity, arrivalCity, departureDate, departureTime);
    saveTicketsAndRedirect(mockTickets); // Enregistre les billets et redirige
  });
});
