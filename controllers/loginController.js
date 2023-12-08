const User = require('../models/User')
const jwt = require('jsonwebtoken')

//handle errors
handleErrors = (err) => {
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
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }
}