// Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../server/config/validation')

require("dotenv").config()
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors())
app.use(express.json())

mongoose.connect(MONGODB_URL)

app.post('/api/register', async (req, res) => {
    try {

        // UserName , email, Password is valid or not
        const validationFail = registerValidation(req.body);
        if(validationFail) {
            return res.status(500).json({
                success : false,
                message : validationFail
            });
        }

        // User is already in the database or not
        const userExist = await User.findOne({email : req.body.email});
        if(userExist) {
            return res.status(500).json({
                success : false,
                message : "User already exists"
            });
        }

        // Hash the password using BcryptJs
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new User
        const user = new User({
            userName : req.body.userName,
            email : req.body.email,
            password : hashedPassword,
        });

        // save the new user
        const savedUser = await user.save();
        return res.status(200).json({
            success : true,
            user : user._id,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error,
        });
    }
})

app.post('/api/login', async (req, res) => {
    try {

        // Validation for email and password
        const validationFail = loginValidation(req.body);
        if(validationFail) {
            return res.status(500).json({
                success : false,
                message : validationFail,
            });
        }

        // Check if User exist or not
        const user = await User.findOne({email : req.body.email});
        if(!user) {
            return res.status(500).json({
                success : false,
                message : 'Email is not found',
            });
        }

        // Check if the password is correct or not
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(500).json({
                success : false,
                message : "Invalid Password! Password do not match!",
            });
        }

        // Create JWT Token
        const token = jwt.sign({ _id : user._id }, process.env.SECRET_KEY, {
            expiresIn : "18h",
        });
        // console.log("I'm not in the error")
        return res.status(200).header("Authorization", token).send({
            success : true,
            message : "Login successful",
            token : token,
            user : user,
        });

    } catch (error) {
        // console.log("I'm in the error")
        return res.status(500).json({
            success : false,
            message : error,
        });      
    }
})

app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token'];

    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Yaha aa rha hai ya nhi")
        const email = decoded.email;    

        const user = await User.findOne({email : email});
        console.log(user.quote)
        return res.json({success : true, quote : user.quote})

    } catch (error) {
        console.log(error);
        return res.json({ success : false, message : "Invalid token" })
    }
    
})

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;    

        await User.updateOne({email : email}, { $set : {quote : req.body.quote}});

        return res.json({success : true})

    } catch (error) {
        console.log(error);
        return res.json({ success : false, message : "Invalid token" })
    }
    
})

app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
})