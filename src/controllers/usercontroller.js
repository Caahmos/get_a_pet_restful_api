const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-tokens');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');

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

        const usuario = new User({ name, email, phone, password: senhaHash });
        
        try{
            const newUser = await usuario.save();
            
            await createUserToken(newUser, req, res);
        }catch(err){
            res.status(422).json({ message: 'Erro ao adicionar o registro!'});

        }
    };

    static async login(req, res){
        const { email, password } = req.body;
        
        if(!email) return res.status(422).json({ message: 'O campo email é obrigatório!'});
        if(!password) return res.status(422).json({ message: 'O campo senha é obrigatório!'});

        const user = await User.findOne({ email });
        if(!user) return res.status(422).json({ message: 'Não existe um usuário cadastrado com esse e-mail!'});
        
        const validarSenha = bcrypt.compareSync(password, user.password);

        if(!validarSenha) return res.status(422).json({ message: 'Usuário e/ou senha inválidos!'});

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res){
        let currentUser;

        console.log(req.headers.authorization)

        if(req.headers.authorization){

            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');

            currentUser = await User.findById(decoded.id);

            currentUser.password = undefined;

        }else{
            currentUser = null;
        }

        res.status(200).send(currentUser);

    }

    static async findUserbyId(req, res){
        const user = await User.findById(req.params.id);

        if(!user) return res.status(422).json({ message: 'Usuário não encontrado!'});

        user.password = undefined;

        res.status(200).json({user});
    }
};