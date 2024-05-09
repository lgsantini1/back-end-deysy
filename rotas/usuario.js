const { Router } = require("express");
const {
    getUsuarios, getUsuario, getUsuarioTelefone,
    postUsuario, patchUsuario, deleteUsuario
} = require("../controladores/usuario");

const router = Router();

// List all users
router.get('/', getUsuarios);

// Retrieve user by telephone 
router.get('/telefone/:telefone', getUsuarioTelefone);

// Retrieve user by ID
router.get('/:idusuario', getUsuario);

// Create a new user
router.post('/', postUsuario);

// Update a user
router.patch('/:idusuario', patchUsuario);

// Delete a user
router.delete('/:idusuario', deleteUsuario);

module.exports = router;
