const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports.get =  (req, res) => {
    res.render('profile')
}


//Function to handle put requests to ("/profile"). We take the user id from the decoded token so we don't need an id param in the url of the request. if there is no token or the token is invalid we reidrect the user to the login page. if the token is valid we update the user.
module.exports.put = (req, res) => {
    const {firstName, lastName, email, github, profilePicture, cv, password} = req.body
    const token = req.cookies.jwt    
    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/')
            } else {
                try {
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
                        res.redirect('/profile')
                } catch (error) {
                    console.log(error);
                }
                
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
                res.send(`User ${decodedToken.id} correctly deleted`)
            }
        })
    } else {
        res.redirect('/login')
    }
}