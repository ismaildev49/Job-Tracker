const registerController = require('./registerController')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.get = (req, res) => {
    res.render('login')
}


const maxAge = 3 * 24 * 60 * 60 
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn : maxAge
    })
}

module.exports.post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge * 1000})
        res.status(200).json({user : user._id})
    } catch (err) {
        const errors = registerController. handleErrors(err)
        res.status(400).json({errors})
    }
}