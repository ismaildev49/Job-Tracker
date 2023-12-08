const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.get =  (req, res) => {
    res.render('profile')
}

module.exports.put = (req, res) => {
    const {firstName, lastName, email, github, profilePicture, cv, password} = req.body
    const token = req.cookies.jwt    
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/')
            } else {
                const user = await User.findOneAndUpdate(
                    {_id : decodedToken.id},
                    {$set : {
                        firstName,
                        lastName,
                        email, 
                        github, 
                        profilePicture, 
                        cv, 
                        password
                    }});
            }
        })
    } else {
        res.redirect('/login')
    }
}
module.exports.delete = (req, res) => {
    const token = req.cookies.jwt    
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/')
            } else {
                await User.findOneAndDelete({_id : decodedToken.id})
            }
        })
    } else {
        res.redirect('/login')
    }
}