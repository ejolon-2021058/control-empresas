const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Empresa = require('../models/empresa');


const getEmpresas = async (req = request, res = response) => {

    const query = { estado: true };
  
    const listaEmpresas = await Promise.all([
      Empresa.countDocuments(query),
      Empresa.find(query),
    ]);
  
    res.json({
      msg: "get Api - Controlador Empresa",
      listaEmpresas,
    });
  };


const postEmpresa = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, correo, password, tipo } = req.body;
    const empresaGuardadoDB = new Empresa({ nombre, correo, password, tipo });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    empresaGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await empresaGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Empresa',
        empresaGuardadoDB
    });

}


const putEmpresa = async (req = request, res = response) => {
    
    //Req.params sirve para traer parametros de las rutas
    const idE = req.empresa.id;
    const { _id,tipo, estado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const empresaEditada = await Empresa.findByIdAndUpdate(idE, resto, {new: true});

    res.json({
        msg: 'PUT editar user',
        empresaEditada
    });

}

const deleteEmpresa = async (req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const idE = req.empresa.id;
    //Eliminar fisicamente de la DB
    const empresaEliminada = await Empresa.findByIdAndDelete(idE, {new: true});
    res.json({
        msg: 'DELETE eliminar user',
        empresaEliminada
    });
}


const putAsignarSucursal = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const idE = req.empresa.id;
    const { _id, nombre, password, correo, tipo, estado, ...resto } = req.body;
    const empresaEditada = await Empresa.findByIdAndUpdate(idE, resto);
    //Los parametros img, rol, estado y google no se modifican, el resto de valores si (nombre, correo y password)

    res.json({
        msg: 'PUT asignar sucursal',
        empresaEditada
    });
}






module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    putAsignarSucursal
}

