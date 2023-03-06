const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');

const coleccionesPermitidas = [
    'sucursals',
];


const buscarSucursal = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino ); 

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            results: ( sucursal ) ? [ sucursal ] : [] 
        });
    } 

    const regex = new RegExp( termino, 'i');

    const sucursals = await Sucursal.find({
        $or: [ { nombre: regex }, { ubicacion: regex } ],
    });

    res.json({
        results: sucursals
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }


    switch (coleccion) {
        case 'sucursals':
            buscarSucursal(termino, res);
        break;
        /*case 'sucursals':
           buscarSucursales(termino, res);
        break;*/
        default:
            res.status(500).json({
                msg: 'Error, se te olvido hacer esta busqueda...'
            });
        break;
    }

}


module.exports = {
    buscar
}