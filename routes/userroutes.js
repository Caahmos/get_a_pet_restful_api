const express = require('express');
const route = express.Router();
const UserController = require('../src/controllers/usercontroller');
const verifyToken = require('../src/helpers/verify-token');
const { imageUpload } = require('../src/helpers/image-upload');

route.post('/registrar', UserController.registrar);
route.post('/login', UserController.login);
route.get('/checkUser', UserController.checkUser);
route.get('/:id', UserController.findUserbyId);
route.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser);

module.exports = route;