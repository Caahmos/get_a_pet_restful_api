const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserController{
    static async registrar(req, res){
        const { name, email, phone, password, confirmPassword } = req.body;

        if(!name) return res.status(422).json({ message: 'O campo nome é obrigatório!'});
        if(!email) return res.status(422).json({ message: 'O campo email é obrigatório!'});
        if(!phone) return res.status(422).json({ message: 'O campo telefone é obrigatório!'});
        if(!password) return res.status(422).json({ message: 'O campo senha é obrigatório!'});
        if(!confirmPassword) return res.status(422).json({ message: 'O campo confirmar a senha é obrigatório!'});
        if(password != confirmPassword) return res.status(422).json({ message: 'As senhas devem ser iguais!'});

        const userExists = await User.findOne({ email: email });
        if(userExists) return res.status(422).json({ message: 'Já existe um cadastro nesse email!'});

        
        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(password, salt);

        await User.create({ name, email, phone, password: senhaHash });
        
        res.status(201).json({ message: 'Registro adicionado com sucesso!'})
    };
};