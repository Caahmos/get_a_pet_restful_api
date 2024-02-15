const express = require('express');
const route = express.Router();
const UserController = require('../src/controllers/usercontroller');

route.post('/registrar', UserController.registrar);
route.post('/login', UserController.login);

module.exports = route;