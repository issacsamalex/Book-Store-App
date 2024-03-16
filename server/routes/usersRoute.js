const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.route('/register').post(registerController.createNewUser);

router.route('/login').post(loginController.userLogin);

router.route('/google').post(loginController.googleLogin);

router.route('/get-logged-in-user').get(authMiddleware, authController.loggedInUser);

router.route('/get-all-users/:role').get(authMiddleware, userController.getAllUsers);

router.route('/get-user-by-id/:id').get(authMiddleware, userController.getUserById);

router.route('/update-user').put(authMiddleware, userController.updateUser);

router.route('/delete-user/:id').delete(authMiddleware, userController.deleteUser);



module.exports = router;