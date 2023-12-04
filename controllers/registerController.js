const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.get = (req, res) => {
    res.render('register')
}
//handle errors
module.exports.handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors =  { email : '', password : ''}

    //incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'that email is not registered'
    }
    //incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'that password is incorrect'
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'This email is already registered'
        return errors
    }
    

    //Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        }) 
    }

    return errors
}
const maxAge = 3 * 24 * 60 * 60 
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn : maxAge
    })
}
module.exports.post = async (req, res) => {
    const {firstName, lastName, email, github, profilePicture, cv, password, offers} = req.body
    try {
        const user = await User.create({firstName, lastName, email, github, profilePicture, cv, password, offers})
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly : true, maxAge : maxAge * 1000})
        res.status(201).json({user : user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors})
    }
}

