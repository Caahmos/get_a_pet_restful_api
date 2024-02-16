const express = require('express');
const route = express.Router();
const UserController = require('../src/controllers/usercontroller');

route.post('/registrar', UserController.registrar);
route.post('/login', UserController.login);
route.get('/checkUser', UserController.checkUser);
route.get('/:id', UserController.findUserbyId);

module.exports = route;