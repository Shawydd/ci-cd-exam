const request = require("supertest");
const { app, close } = require("./app");

describe("Test API gestione libri", () => {
    it("GET /api/libri - test array vuoto iniziale", async () => {
        const res = await request(app).get("/api/libri");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it("GET /api/libri/:Id - test ricerca tramite ID", async () => {
        const testBook = {
            Codice: "Test",
            Nome: "tB",
            Desc: "tD",
            Prez: 1.1,
            Quant: 1,
            Autore: "tA",
        };

        const postRes = await request(app).post("/api/libri").send(testBook);
        const getRes = await request(app).get(`/api/libri/${postRes.body.Codice}`);

        expect(getRes.statusCode).toEqual(200);
        expect(getRes.body.Nome).toEqual(testBook.Nome);
    });

    it("POST /api/libri - test aggiunta nuovo libro", async () => {
        const testBook = {
            Nome: "tB",
            Desc: "tD",
            Prez: 1.1,
            Quant: 1,
            Autore: "tA",
        };

        const res = await request(app).post("/api/libri").send(testBook);
        expect(res.statusCode).toEqual(201);
        expect(res.body.Nome).toEqual(testBook.Nome);
    });

    it("DELETE /api/libri/:Id - test eliminazione libro esistente", async () => {
        const testBook = {
            Codice: "Test",
        };

        const res = await request(app).post("/api/libri").send(testBook);
        expect(res.statusCode).toEqual(201);

        await request(app).delete(`/api/libri/${testBook.Codice}`);

        const resGet = await request(app).get("/api/libri");
        expect(resGet.body.find(b => b.codice === testBook.Codice)).toBeUndefined();
    });

    it("GET /api/libri/:Id/incrementa - test incremento", async () => {
        const testBook = {
            Codice: "Test",
            Quant: 1,
        };
    
        const postRes = await request(app).post("/api/libri").send(testBook);
        const getRes = await request(app).get(`/api/libri/${postRes.body.Codice}/incrementa`);
    
        expect(getRes.body.product.Quant).toBe(2);
    });

    it("GET /api/libri/:Id/decrementa - test decremento", async () => {
        const testBook = {
            Codice: "Test",
            Quant: 1,
        };
    
        const postRes = await request(app).post("/api/libri").send(testBook);
        const getRes = await request(app).get(`/api/libri/${postRes.body.Codice}/decrementa`);
    
        expect(getRes.body.product.Quant).toBe(0);
    });

    afterAll((done) => {
        close();
        done();
    });
});

