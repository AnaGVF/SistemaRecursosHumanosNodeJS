const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
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

user.post("/login", async (req, res, next) => {
    const { username, pass } = req.body;
    const query = `SELECT * FROM usuarios WHERE username = '${username}' AND pass = '${pass}'`;
    const rows = await db.query(query);

    if(username && pass) {
        if(rows.length == 1) {
            const token = jwt.sign({
                id: rows[0].id,
                username: rows[0].username
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
        }
    } 
    return res.status(500).json({ code: 500, message: "Campos incompletos" });  
});

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM usuarios";
    const rows = await db.query(query);

    return res.status(200).json({ code: 200, message: rows });
});

module.exports = user;