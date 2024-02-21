const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const conne = require('./db/conne');
const routeUser = require('./routes/userroutes')
const routePet = require('./routes/petsroutes')

app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/users', routeUser);
app.use('/pets', routePet);

app.listen(5000, () => {
    console.log('Servidor está rodando!');
    console.log('http://localhost:5000');
})