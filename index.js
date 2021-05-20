/*
Verbos HTTP
GET - obtener recursos 
POST - almacenar/crear recursos
PATCH - modificar una parte de un recurso
PUT - modificar un recurso
DELETE - borrar un recurso
*/ 

const morgan = require('morgan');
const express = require('express');
const app = express();
const empleados = require('./routes/empleados');
const user = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).json({ code: 1, message: "Bienvenido!!" });
});

app.use("/empleados", empleados);
app.use("/user", user);


app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL no encontrada" });
});

// app.get("/:name", (req, res, next) => {
//     console.log(req.params.name);
//     res.status(200);
//     res.send("Estás en la página: " + req.params.name);
// })

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});