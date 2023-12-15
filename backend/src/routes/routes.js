const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//Rotas de users
router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.delete('/users', userController.deleteAll);

module.exports = router;