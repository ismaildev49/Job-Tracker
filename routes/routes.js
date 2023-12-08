const {Router} = require('express')
const router = Router() 
const {requireAuth} = require('../middleware/authMiddleware')

const dashbordController = require('../controllers/dashbordController')
const loginController = require('../controllers/loginController')
const registerController = require('../controllers/registerController')
const profileController = require('../controllers/profileController')
const offerController = require('../controllers/offerController')




// Homepage
router.get('/', requireAuth, dashbordController.get);

// Login
router.get('/login', loginController.get);

router.post('/login', loginController.post);

// Register
router.get('/register', registerController.get);

router.post('/register', registerController.post);

// Profile
//We don't need the id param in the route because we have it in the decoded token(see  jwt.verify() in profileController.get and profileController.post).
router.get('/profile', requireAuth, profileController.get);

router.put('/profile', requireAuth,  profileController.put);

router.delete('/profile', requireAuth, profileController.delete);



// Offer
router.post('/offer', offerController.post);

router.get('/offer', offerController.get);

router.get('/offer/update/:id', offerController.getUpdateOffer)

router.get('/offer/:id', offerController.getById);

router.delete('/offer/:id', offerController.delete);

router.put('/offer/:id', offerController.put);

module.exports = router;


