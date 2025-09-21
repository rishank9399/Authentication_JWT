const { Signup, Login, Logout } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware");
const { checkDatabaseConnection } = require("../Middlewares/DatabaseMiddleware");
const router = require("express").Router();

router.post("/signup", checkDatabaseConnection, Signup);
router.post('/login', checkDatabaseConnection, Login);
router.post('/logout', Logout);
router.post('/verify', checkDatabaseConnection, userVerification)

module.exports = router; 