/*
Verbos HTTP
GET - obtener recursos 
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/ 

const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido");
});

app.listen(3000, () => {
    console.log("Server is running...");
});