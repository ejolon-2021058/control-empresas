//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getEmpresas,postEmpresa, putEmpresa, deleteEmpresa, putAsignarSucursal } = require('../controllers/empresa');
const { esTipoValido, emailExiste, existeEmpresaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//const { tiene, esAlumnoRole, validarTamañoArray } = require('../middlewares/validar-roles');

const router = Router();

router.post('/registrarEmpresa', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('tipo').custom( esTipoValido ),
    validarCampos,
] ,postEmpresa);


router.put('/editarEmpresa/', [
    validarJWT,
    check('correo').custom( emailExiste ),
    validarCampos
] ,putEmpresa);

router.delete('/eliminarEmpresa/', [
    validarJWT,
    validarCampos
] ,deleteEmpresa);

router.put('/asignarSucursal/', [
    validarJWT,
    validarCampos
] ,putAsignarSucursal);


router.get('/mostrar', getEmpresas);






module.exports = router;

