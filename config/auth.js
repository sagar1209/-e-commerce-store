
const jwt = require('jsonwebtoken');

const blacklist = new Set();

const generateToken = async (payload, secretKey,expiresIn = '10h') => {
    try {
        return jwt.sign(payload, secretKey,{ expiresIn });
    } catch (error) {
        return res.status(401).json({ error: 'Failed to generate token' });
    }
}

const verifyToken = async (req, res, next, secretKey) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token is missing.' });
        }
        const decoded = jwt.verify(token, secretKey);
        if (blacklist.has(decoded.uniqueID)) {
            return res.status(401).json({ message: "Token expired or revoked"});
        }
        req.id = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

const expireToken = async(req,res,next)=>{
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);
        blacklist.add(decoded.uniqueID);
        return next();
    } catch (error) {
        return res.status(500).json({ error: "internal server Error" });
    }
}

module.exports = {
    generateToken,
    verifyToken,
    expireToken
};
