const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Sucursal = require('../models/sucursal');
const Empresa = require('../models/empresa');


const getSucursalPorID = async (req = request, res = response) => {
    const _id = req.empresa.id;
    const query = { empresa: _id };
  
    const listaSucursales = await Promise.all([
      Sucursal.countDocuments(query),
      Sucursal.find(query).populate("empresa", "nombre"),
    ]);
  
    res.json({
      msg: "get Api - Controlador empresa",
      listaSucursales,
    });
};



const postSucursal = async (req = request, res = response) => {
    const {nombre, municipio, direccion}= req.body;
    const idE = req.empresa.id;

    const sucursalDB = await Sucursal.findOne({ nombre });

    //validacion para verificar si ya existe dicha curso para que no lo agregue
    if (sucursalDB) {
        return res.status(400).json({
            msg: `El su ${sucursalDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        municipio,
        direccion,
        empresa: idE
    }

    const sucursal = new Sucursal(data);
    //Guardar en DB
    await sucursal.save();

    res.status(201).json(sucursal);

}


const putSucursal = async (req = request, res = response) => {
    const { id } = req.params;
    const { empresa, ...resto } = req.body;

    resto.empresa = req.empresa.id

    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json(sucursalEditada);


};


const deleteSucursal = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const idE = req.empresa.id;
    //Eliminar fisicamente de la DB
    const sucursalEliminada = await Sucursal.findByIdAndDelete(id);
    await Empresa.findByIdAndUpdate(idE, { $pull: { Sucursal: id } })

    res.json({
        msg: 'DELETE eliminar Sucursal',
        sucursalEliminada
    });
}


module.exports = {
    postSucursal,
    putSucursal,
    deleteSucursal,
    getSucursalPorID
}

