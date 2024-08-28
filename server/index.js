// Express

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

require("dotenv").config()
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const MONGODB_URL = process.env.MONGODB_URL

app.use(cors())
app.use(express.json())

mongoose.connect(MONGODB_URL)

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        })
        res.json({status : 'ok'})
    } catch (error) {
        console.log(error)
        res.json({status : 'error'})
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    
    const user = await User.findOne({
        email : req.body.email,
        password : req.body.password,
    })

    if(user) {
        
        const token = jwt.sign({
            email : user.email,
        }, SECRET_KEY, )
        
        res.json({status : 'ok', user : token})
    }
    else {
        res.json({status : 'error', user : false})
    }
})

app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
})