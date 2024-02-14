const User = require('../models/User');

module.exports = class UserController{
    static async registrar(req, res){
        res.json({ message: 'Olá, Get A Pet!' });
    };
};