const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserbyToken = require('../helpers/get-user-by-token');

module.exports = class PetController {
    static async create(req, res) {

        try {
            const { name, age, weight, color } = req.body;
            const avaiable = true;

            if (!name) return res.status(422).json({ message: 'O nome é obrigatório!' });
            if (!age) return res.status(422).json({ message: 'A idade é obrigatória!' });
            if (!weight) return res.status(422).json({ message: 'O peso é obrigatório!' });
            if (!color) return res.status(422).json({ message: 'A cor é obrigatória!' });

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

            const newPet = await pet.save();

            res.status(201).json({ message: 'criado com sucesso', newPet});
        }catch(err){
            console.log(err);
            res.status(422).json({ message: 'Pet não foi cadastrado!'});
        };
    };
};