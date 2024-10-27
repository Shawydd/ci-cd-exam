## Creare una pipeline con GitHub Actions per sviluppare un processo di CI/CD.
All'interno della pipeline, collegata con Docker Hub dovrà essere presente una API NodeJS così composta:
### Creare una API di gestione libri
Ogni prodotto è caratterizzato da:
Codice (assegnato in automatico come UUID, con un plugin scaricabile da npmjs),
Nome,
Descrizione,
Quantità,
Prezzo,
Autore 

Gli endpoint richiesti sono:
GET: /api/libri  - Restituisce tutti i libri
GET: /api/libri/:codice - Restituisce singolo libro
POST: /api/libri  - Inserisce un libro
DELETE: /api/libri/:codice - Elimina singolo libro
GET: /api/libri/:codice/incrementa - Aggiunge 1 unità al libro selezionato
GET: /api/libri/:codice/decrementa - Sottrae 1 unità al libro selezionato

Non è richiesto un database, potete creare un array di oggetti direttamente dentro all'applicazione (app.js)

COSA CONSEGNARE:
Link alla repository pubblica dove è stato configurato GitHub Actions in modo tale che possa vedere il workflow attivo!
Il link dovrà essere inserito in un file TXT, una volta caricato cliccate sul tasto "consegna" o similari.