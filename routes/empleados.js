const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

empleados.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});


empleados.get('/', async (req, res, next) => {
    const empld = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 1, message: empld });
});

module.exports = empleados;