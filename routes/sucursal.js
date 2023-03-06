//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getSucursalPorID, postSucursal, putSucursal, deleteSucursal } = require('../controllers/sucursal');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//const { tiene, esAlumnoRole, validarTamañoArray } = require('../middlewares/validar-roles');

const router = Router();


router.get("/mostrarSucursalEmpresa", [
        validarJWT,
        validarCampos
    ],getSucursalPorID);

router.post('/agregarSucursal', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT
] ,postSucursal);

router.put('/editarSucursal/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( existeCursoPorId ),
    validarJWT,
    validarCampos
] ,putSucursal);


router.delete('/eliminarSucursal/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,deleteSucursal);


module.exports = router;

