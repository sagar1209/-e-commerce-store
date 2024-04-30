
const jwt = require('jsonwebtoken');

const generateToken = async (payload, secretKey) => {
    try {
        return jwt.sign(payload, secretKey);
    } catch (error) {
        console.log(error);
    }
}

const verifyToken = async (req, res, next, secretKey) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is missing.' });
        }
        const decoded = jwt.verify(token, secretKey);
        req.id = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
