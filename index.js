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
    res.send("¡Bienvenid@!");
});

app.get("/:name", (req, res, next) => {
    console.log(req.params.name);
    res.status(200);
    res.send("Estás en la página: " + req.params.name);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});