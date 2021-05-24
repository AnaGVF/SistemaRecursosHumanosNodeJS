const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

empleados.post("/create",async (req, res, next) => {
    const {nombre, apellidos, telefono, email, direccion} = req.body;
    console.log(req.body);
    if(nombre && apellidos && telefono && email && direccion) {
        let query = "INSERT INTO empleados(nombre,apellidos,telefono,email,direccion)";
        query += `VALUES('${nombre}','${apellidos}',${telefono},'${direccion}','${email}')`;
        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message: "Empleado insertado correctamente"});
        }

        return res.status(500).json({code:500, message:"Ocurrió un error"});
    }
    
});

empleados.delete('/:id([0-9]{1,3})',async(req,res,next)=>{
    const query = `DELETE FROM empleados WHERE id =${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        return res.status(200).json({coded:200,message:"Empleado borrado correctamente"});
    }
    res.status(404).json({code:404, message:"Empleado no encontrado"});
});

empleados.put('/:id([0-9]{1,3})', async(req,res,next)=>{
    const {nombre, apellidos, telefono, email, direccion} = req.body

    if(nombre, apellidos, telefono, email, direccion){
        let query = `UPDATE empleados SET nombre = '${nombre}',apellidos='${apellidos}',`;
        query += `telefono=${telefono}, email='${email}', direccion='${direccion}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);

        if(rows.affectedRows == 1){
            return res.status(200).json({code:200, message:"Empleado acualizado correctamente"});
        }
        return res.status(500).json({code:500, message:"Ocurrió un error"});
    }
    return res.status(500).json({code:500, message:"Campos incompletos"});
});

empleados.patch('/:id([0-9]{1,3})', async (req, res, next)=>{
    if(req.body.name){
        let query = `UPDATE empleados SET nombre='${req.body.nombre}' WHERE id =${req.params.id}`;

        if(rows.affectedRows == 1){
            return res.status(200).json({code:200,message:"Empleado actualizado correctamente"});
        }

        return res.status(500).json({code:500, message:"Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos"});
});

empleados.get('/', async (req, res, next) => {
    const empld = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 1, message: empld });
});

empleados.get('/:id([0-9],{1,3})',async (req, res, next)=>{
    const id = req.params.id;

    const empld = await db.query("SELECT * FROM empleados WHERE id ="+id+";");

    (id >= 1 && id <=900)? res.status(200).json({code:200,message:empld}):
    res.status(404).json({code:404, message:"Empleado no encontrado"});
});

empleados.get('/:name([A-Za-z]+)',async(req,res,next)=>{
    const name = req.params.name;
    const empld = await db.query("SELECT * FROM empleados WHERE nombre= "+name+";");
    if(empld.length > 0){
        return res.status(200).json({code:200,message:empld});
    }

    return res.status(404).json({code:404,message:"Empleado no encontrado"});
});

module.exports = empleados;