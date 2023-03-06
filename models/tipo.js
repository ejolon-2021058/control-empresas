const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    tipo: {
        type: String,
        required: [true , 'El Tipo es obligatorio']
    },
});


module.exports = model('Tipo', TipoSchema);