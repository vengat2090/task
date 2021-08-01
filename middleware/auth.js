const jwt = require('jsonwebtoken');
const createToken = async (data) => {
    const token = await jwt.sign({ data }, process.env.JWT_Secret_Key, { expiresIn: '1d' });
    return token;
};

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_Secret_Key);
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json({ success: false, message: 'Your session is expired, please login again', data: {} });
        }
        res.status(401).json({ success: false, message: 'Your sessions token is invalid', data: {} });
    }
};
module.exports = { createToken, validateToken };

