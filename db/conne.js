require('dotenv').config();
const mongoose = require('mongoose');

const conne = mongoose.connect(process.env.CONNECTSTRING)
.then(() => {
    console.log('MongoDB conectado com sucesso!');
})
.catch(err => {
    console.log(err);
});

module.exports = conne;