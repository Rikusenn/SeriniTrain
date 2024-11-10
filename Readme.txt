SereniTrain - Train Ticket Booking Application
Description
SereniTrain est une application intuitive qui permet aux utilisateurs de réserver des billets de train en toute simplicité. En plus de fournir une sélection rapide et transparente de billets, SereniTrain propose des remboursements automatiques pour les retards et les annulations, assurant aux utilisateurs un voyage sans souci.

Fonctionnalités
Recherche de Billets : Les utilisateurs peuvent rechercher des billets de train disponibles selon leurs critères (ville de départ, ville d'arrivée, date, etc.).
Sélection de Billet : L’interface affiche les détails des billets disponibles, y compris la compagnie de train, la ville de départ et d’arrivée, l'heure de départ, la date, et le prix en XRP.
Réservation et Escrow sécurisé : Après sélection, les utilisateurs peuvent confirmer leur réservation avec un système de paiement en XRP sécurisé, intégré avec escrow pour garantir les fonds jusqu’à validation.
Remboursement automatique : En cas de problème (annulation ou retard), les utilisateurs reçoivent automatiquement un remboursement grâce à la technologie de blockchain.
Technologies Utilisées
Frontend : HTML, CSS (Bootstrap), JavaScript
Backend : Node.js, Express
Blockchain : XRP Ledger pour les paiements et escrow
Authentification : Web3Auth pour la génération de wallets et la gestion des paiements en fiat. Cette fonctionnalité pour l'instant n'est pas connectée au backend.

Remarque:
Afin de tester l'escrow et les transactions, nous avons créé un wallet temporaire pour vérifier sur le site XRPL que tout marche. Voici les clés pour vérifier les escrows créés:
    Your Testnet CredentialsAddress
        rJTwqc1prCmCF2kM4qAsKdXZVufKodwQoP
    Secret
        sEdSAjzkCxcv33FMxGRJ7qjvLoCNdv3
    Balance
        100 XRP
    Sequence Number
        2185991.

Pour résumer, grâce à l'escrow, nous arrivons à rembourser de façon automatique et instantanée en cas de retard ou d'annulation.
