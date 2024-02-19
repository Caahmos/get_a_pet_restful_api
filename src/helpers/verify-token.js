const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const checkToken = (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Acesso negado!' });

    const token = getToken(req);

    if (!token) return res.status(401).json({ message: 'Acesso negado!' });

    try {
        const verify = jwt.verify(token, 'nossosecret');
        req.user = verify;
        next();
    }catch(err){
        return res.status(401).json({ message: 'Token Inválido!' });
    }
}

module.exports = checkToken;