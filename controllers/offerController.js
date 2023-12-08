const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Offer = require('../models/offer')

// Function to handle get requests to ("/offer").We just render the create_offer.ejs page so the user can post offers.
module.exports.get = (req, res) => {
    res.render('create_offer')
}
//Function to handle get requests to ('/offer/update/:id'). We take the id offer from the params of the request. We search fo this offer and we store it in local variable called offer so we can acces it. Finally we render the update_offer.ejs page where we can prefill the outputs with the values of each property.
module.exports.getUpdateOffer = async (req, res) => {
    const id = req.params.id
    res.locals.offer = await Offer.findById(id)
    res.render('update_offer')
}

// Function to handle post requests to ('/offer'). User can only post requests if he's logged in because we take his Id from the jwt token in the cookies. If there is no token or the token is not valid, the user will be redirected to the login page.
//If there is a token AND it is valid, we find the user trough de decodedToken, we create an offer with the user id inside of the offer. And we push the id of the offer inside of the offer property of the user. After that we redirect the user to the home page where he can see all his offers.
module.exports.post = (req, res) => {
    const token = req.cookies.jwt
    console.log(req.body);
    const offerData = req.body
    if (token) {
        try {
            jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
                if (err) {
                    console.log(err.message);
                    } else {
                        try {
                            let user = await User.findById(decodedToken.id)
                            const offer = new Offer({...offerData, user : user.id})
                            await offer.save()
                            user.offers.push(offer._id)
                            await user.save()
                            res.redirect('/')
                        } catch (error) {
                            console.log(`An error occured when attempting to find the user by his ID, or when creating and saving the offer, or when saving the id of the offer in the user, or when saving the user : ${error}`);
                        }
                        
                    }
                })
        } catch (error) {
            console.log("JWT token not valid : " + error);
            res.redirect('/login')
        }
        
    } else {
        res.redirect('/login')
    }
    
    }

// Function to handle get requests to ('/login/:id'). We find the offer by the Id, then we create a local variable "offers" so we can acces this offer in the dashbord and display it in the display_offer.ejs.
module.exports.getById = async (req, res) => {
    const offerId = req.params.id
    const offer = await Offer.findById(offerId)
    res.locals.offer = offer       
    res.render('display_offer')        
    console.log(offer);     
}

// Function to handle put requests to ("/offer/:id"). First we find the offer by its Id. We take the new properties of the offer from the body of the request and we update the offer via the findOneAndUpdate method. When it's done we redirect the user to the home page.
module.exports.put = async (req, res) => {
    const offerId = req.params.id
    const {jobTitle, companyName, website, contact, origin, status, comment} = req.body
    try {
        await Offer.findOneAndUpdate(
            {_id : offerId},
            {$set : {
                jobTitle,
                companyName,
                website, 
                contact, 
                origin, 
                status, 
                comment,
            }});
            res.redirect('/')
    } catch (error) {
        console.log(error)
    }
    
}
// Same as the function above. We just use findOneAndDelete instead of findOneAndUpdate.
module.exports.delete = async (req, res) => {
    const offerId = req.params.id
    try {
        await Offer.findOneAndDelete(
            {_id : offerId})
            res.redirect('/')
    } catch (error) {
        console.log(error)
    }
    
}