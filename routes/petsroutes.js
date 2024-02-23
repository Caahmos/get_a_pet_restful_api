const express = require('express');
const route = express.Router();
const PetsController = require('../src/controllers/petscontroller');
const verifyToken = require('../src/helpers/verify-token');
const { imageUpload } = require('../src/helpers/image-upload');
const PetController = require('../src/controllers/petscontroller');

route.post('/create', verifyToken, imageUpload.array('images'), PetsController.create);
route.get('/', PetsController.getAll);
route.get('/mypets', verifyToken, PetsController.getAllUserPets);
route.get('/myadoptions', verifyToken, PetsController.getAllUserAdoptions);
route.get('/:id', PetsController.getPetbyId);
route.delete('/:id', verifyToken, PetsController.removePetbyId);
route.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet);
route.patch('/schedule/:id', verifyToken, PetController.schedule);
route.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);

module.exports = route;