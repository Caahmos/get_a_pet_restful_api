const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
    static async create(req, res) {

        try {
            const { name, age, weight, color } = req.body;
            const images = req.files;
            const avaiable = true;

            if (!name) return res.status(422).json({ message: 'O nome é obrigatório!' });
            if (!age) return res.status(422).json({ message: 'A idade é obrigatória!' });
            if (!weight) return res.status(422).json({ message: 'O peso é obrigatório!' });
            if (!color) return res.status(422).json({ message: 'A cor é obrigatória!' });
            if (images.length === 0) return res.status(422).json({ message: 'A imagem é obrigatória!' });

            const token = getToken(req);
            const user = await getUserbyToken(token);

            const pet = new Pet({
                name,
                age,
                weight,
                color,
                avaiable,
                images: [],
                user: {
                    _id: user.id,
                    name: user.name,
                    phone: user.phone,
                    image: user.img
                }
            });

            images.map(image => {
                pet.images.push(image.filename);
            });

            const newPet = await pet.save();

            res.status(201).json({ message: 'criado com sucesso', newPet });
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: 'Pet não foi cadastrado!' });
        };
    };

    static async getAll(req, res) {
        try {

            const allPets = await Pet.find().sort('-createdAt');
            res.status(200).json({ message: 'Pets resgatados com sucesso!', allPets });

        } catch (error) {
            res.status(422).json({ message: 'Erro na busco pelos pets.' });
        };
    };

    static async getAllUserPets(req, res) {
        try {
            const token = getToken(req);
            const user = await getUserbyToken(token);

            const mypets = await Pet.find({ 'user._id': user.id }).sort('-createdAt');
            res.status(200).json({ message: 'Pets resgatados com sucesso!', mypets });

        } catch (err) {
            res.status(422).json({ message: 'Erro na busca pelos pets.' });
        };
    };

    static async getAllUserAdoptions(req, res) {
        try {
            const token = getToken(req);
            const user = await getUserbyToken(token);

            const myadoptions = await Pet.find({ 'adopter._id': user.id }).sort('-createdAt');
            res.status(200).json({ message: 'Pets resgatados com sucesso!', myadoptions });

        } catch (error) {
            res.status(422).json({ message: 'Erro na busca pelos pets.' });
        };
    };

    static async getPetbyId(req, res) {
        try {
            const id = req.params.id;

            if (!ObjectId.isValid(id)) return res.status(422).json({ message: 'Id não é válido!' });

            const petAtual = await Pet.findById(id);
            res.status(200).json({ message: 'Resgate bem sucedido!', petAtual });
        } catch (err) {
            res.status(422).json({ message: 'Resgate mal sucedido!' });
            console.log(err);
        };
    };

    static async removePetbyId(req, res) {
        try {
            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);

            if (!ObjectId.isValid(id)) return res.status(422).json({ message: 'Id não é válido!' });

            const petAtual = await Pet.findById(id);

            if (!petAtual) return res.status(404).json({ message: 'Pet não encontrado!' });

            if (petAtual.user._id.toString() !== user.id.toString()) return res.status(422).json({ message: 'Usuário não é o dono do pet!' });

            await Pet.findByIdAndDelete(id);

            res.status(200).json({ message: 'Pet removido com sucesso!' });
        } catch (err) {
            res.status(422).json({ message: 'Algo deu errado!' });
            console.log(err);
        };
    };

    static async updatePet(req, res) {
        try {

            const id = req.params.id;
            const token = getToken(req);
            const user = await getUserbyToken(token);

            const { name, age, weight, color, avaiable } = req.body;
            const images = req.files;
            const updateData = {};

            const petAtual = await Pet.findById(id);

            if (!petAtual) return res.status(404).json({ message: 'Pet não encontrado!' });

            if (petAtual.user._id.toString() !== user.id.toString()) return res.status(422).json({ message: 'Usuário não é o dono do pet!' });

            if (!name) return res.status(422).json({ message: 'O nome é obrigatório!' });
            updateData.name = name;
            if (!age) return res.status(422).json({ message: 'A idade é obrigatória!' });
            updateData.age = age;
            if (!weight) return res.status(422).json({ message: 'O peso é obrigatório!' });
            updateData.weight = weight;
            if (!color) return res.status(422).json({ message: 'A cor é obrigatória!' });
            updateData.color = color;
            if (images.length === 0) return res.status(422).json({ message: 'A imagem é obrigatória!' });
            updateData.images = images;

            images.map(image => {
                updateData.images.push(image.filename);
            });

            const petUpdate = await Pet.findByIdAndUpdate(id, updateData);

            res.status(201).json({ message: 'Pet atualizado com sucesso', petUpdate });
        } catch (err) {
            console.log(err);
            res.status(422).json({ message: 'Pet não foi atualizado!' });
        };
    }
};