const Tipo = require('../models/tipo');
const Empresa = require('../models/empresa');


//Este archivo maneja validaciones personalizadas

const esTipoValido = async( tipo = '' ) => {

    const existeTipo = await Tipo.findOne( { tipo } );

    if ( !existeTipo ) {
        throw new Error(`El tipo ${ tipo } no está registrado en la DB`);
    }

}


const emailExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Empresa.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}


const existeEmpresaPorId = async(id) => {

    //Verificar si el ID existe
    const existeEmpresa = await Empresa.findById(id);

    if ( !existeEmpresa ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

/*
const existeCursoPorId = async(id) => {

    //Verificar si el ID existe
    const existeCurso = await Curso.findById(id);

    if ( !existeCurso ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}*/


module.exports = {
    esTipoValido,
    emailExiste,
    existeEmpresaPorId,
    //existeCursoPorId

}