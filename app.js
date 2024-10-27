const express = require('express')
const bodyParser = require('body-parser')

const { v4: uuidv4 } = require('uuid');

const app = new express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const Port = 3000

const server = app.listen(Port, () => {
    console.log(`Siamo sulla ${Port}...`)
})

let libri = []

// findAll
app.get("/api/libri", (req, res) => {
    res.json(libri);
});

// findById
app.get("/api/libri/:Id", (req, res) => {
    const book = libri.find(b => b.Id === req.params.Codice);

    book ? res.json(book) : res.status(404).json({ message: 'Libro non trovato' });
})

// post
app.post("/api/libri", (req, res) => {
    const newBook = {
        Codice: uuidv4(),
        Nome: req.body.Nome,
        Desc: req.body.Desc,
        Prez: req.body.Prez,
        Quant: req.body.Quant,
        Autore: req.body.Autore
    }
    libri.push(newBook)
    res.status(201).json(newBook); 
})

// delete
app.delete("/api/libri/:Id", (req, res) => {
    let varId = req.params.Id
    for (let [index, item] of libri.entries()) {
        if (item.Codice == varId) {
            libri.splice(index, 1)

            return res.json({
                status: "Success",
                message: "Prodotto eliminato con successo"
            })
        }
    } res.json({
        status: "Error",
        message: "Errore nell'eliminazione del prodotto"
    })
})

// increment
app.get("/api/libri/:Id/incrementa", (req, res) => {
    let varId = req.params.Id;

    for (let [index, item] of libri.entries()) {
        if (item.Codice === varId) {
            item.Quant++;

            return res.json({
                status: "Success",
                message: "Prodotto incrementato con successo",
                product: item
            });
        }
    }
    res.json({
        status: "Error",
        message: "Errore nell'incremento"
    });
});

// decrement
app.get("/api/libri/:Id/decrementa", (req, res) => {
    let varId = req.params.Id;

    for (let [index, item] of libri.entries()) {
        if (item.Codice === varId) {
            if (item.Quant > 0) {
                item.Quant--;

                return res.json({
                    status: "Success",
                    message: "Prodotto decrementato con successo",
                    product: item
                });
            } else {
                return res.json({
                    status: "Error",
                    message: "Quantità già a 0, impossibile decrementare"
                });
            }
        }
    }
    res.json({
        status: "Error",
        message: "Errore nel decremento"
    });
});

const close = () => {
    server.close();
}

module.exports = { app, close }