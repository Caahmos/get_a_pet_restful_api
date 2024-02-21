const express = require('express');
const route = express.Router();
const PetsController = require('../src/controllers/petscontroller');
const verifyToken = require('../src/helpers/verify-token');

route.post('/create', verifyToken, PetsController.create);

module.exports = route;