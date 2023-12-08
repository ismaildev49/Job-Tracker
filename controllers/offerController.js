const jwt = require('jsonwebtoken')
const User = require('../models/User')
module.exports.get = (req, res) => {
    res.render('offer')
}
module.exports.post = (req, res) => {
    const token = req.cookies.jwt
    console.log(req.body);
    
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id)
                user.offers.push(req.body)
                await user.save()
                res.send('offer correctly sent')
            }
        })
    }


module.exports.getById = (req, res) => {
    
}


module.exports.put = (req, res) => {
    
}
module.exports.delete = (req, res) => {
    
}