const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    tipo: {
        type: String,
        required: true
    },
    Sucursal: [{
        type: Schema.Types.ObjectId,
        ref: 'Sucursal',
    }],
    estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Empresa', EmpresaSchema);