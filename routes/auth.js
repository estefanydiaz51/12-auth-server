const { Router }  = require( 'express' );
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidarJWT } = require('../middlewares/validar-jwt');

const router = Router();



// crear usuario
router.post( '/new', [
    check( 'name', 'El nombre es obligatorio').not().isEmpty(),
    check( 'email', 'El correo es obligatorio').isEmail(),
    check( 'password', 'La contraseña es obligatoria').isLength( { min: 6 }),
    validarCampos
], crearUsuario );

// Login usuario

//7pKGfoTvOrr6j5QS
router.post( '/', [
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).isLength( { min: 6 } ),
    validarCampos
], loginUsuario );

// Validar y revalidar token
router.get( '/renew', ValidarJWT, revalidarToken );


module.exports = router;