const {Router} = require('express')
const router = Router() 
const {requireAuth} = require('../middleware/authMiddleware')

const dashbordController = require('../controllers/dashbordController')
const loginController = require('../controllers/loginController')
const registerController = require('../controllers/registerController')
const profileController = require('../controllers/profileController')
const offerController = require('../controllers/offerController')




// Homepage
router.get('/', dashbordController.get);

// Login
router.get('/login', loginController.get);

router.post('/login', loginController.post);

// Register
router.get('/register', registerController.get);

router.post('/register', registerController.post);

// Profile
router.get('/profile/:id', requireAuth, profileController.get);

router.put('/profile/:id', requireAuth,  profileController.put);

router.delete('/profile/:id', requireAuth, profileController.delete);



// Offer
router.post('/offer', offerController.post);

router.get('/offer', offerController.get);

router.get('/offer/:id', offerController.getById);

router.delete('/offer/delete/:id', offerController.delete);

router.put('/offer/update/:id', offerController.put);

module.exports = router;


