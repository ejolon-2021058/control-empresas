const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre es obligatorio']
    },
    municipio: {
        type: String,
        required: [true , 'El municipio es obligatorio']
    },
    direccion:{
        type: String,
        required: [true, 'la dirección es obligatoria']
    },
    empresa:{
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    }
});


module.exports = model('Sucursal', SucursalSchema);  