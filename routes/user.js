const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.post("/", async (req, res, next) => {
    const { username, pass, first_name, last_name } = req.body;

    if(username && pass && first_name && last_name) {
        let query = "INSERT INTO usuarios(username, pass, first_name, last_name) "
        query += `VALUES ('${username}', '${pass}', '${first_name}', '${last_name}')`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });    
});



user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM usuarios";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows });
});

module.exports = user;