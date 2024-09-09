require('dotenv').config();
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const {token} = req.cookies

        if(!token) {
            return res.status(401).json({success: false, message: "Unauthorized Access!"})
        }
    

        const {user} = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("in auth ", user)

        req.user = user;
        next();

    } catch(error) {
        res.status(505).json({success: false, message: error.message})
    }
}

module.exports = authMiddleware;