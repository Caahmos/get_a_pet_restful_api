const express = require('express');
const route = express.Router();
const PetsController = require('../src/controllers/petscontroller');
const verifyToken = require('../src/helpers/verify-token');
const { imageUpload } = require('../src/helpers/image-upload');

route.post('/create', verifyToken, imageUpload.array('images'), PetsController.create);
route.get('/', PetsController.getAll);
route.get('/mypets', verifyToken, PetsController.getAllUserPets);
route.get('/myadoptions', verifyToken, PetsController.getAllUserAdoptions);

module.exports = route;