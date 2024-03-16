const User = require('../models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login a user
const userLogin = async (req, res) => {
    try {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.send({
                success : false,
                message : "User does not exist",
            });
        }

        // check if password is correct
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if(!validPassword){
            return res.send({
                success : false,
                message : "Invalid password"
            });
        }

        // Create and assign a token
        const token = jwt.sign({ userId : user._id }, process.env.jwt_secret, { expiresIn : '1d'});
        return res.send({
            success : true,
            message : "Login successful",
            data : token,
        });
    } catch (error) {
        return res.send({
            success : false,
            message : error.message
        });
    }
};

// Login a user through Firebase Google federated login
const googleLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(user){
            const token = jwt.sign({ userId : user._id }, process.env.jwt_secret, { expiresIn : '1d'});
            return res.send({
                success : true,
                message: "Login successful",
                data: token,
            });
        }else {
            const generatedPassword = Math.random().toString(36).slice(-8);
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(generatedPassword, salt);
            const dummyPhone = "XXXXXXXXXX"
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone? req.body.phone : dummyPhone,
                password: hashedPassword,
            });
            await newUser.save();
            const token = jwt.sign({ userId : newUser._id }, process.env.jwt_secret, { expiresIn : '1d'});
            return res.send({
                success: true,
                message: "Login successful",
                data: token,
            });
        };
    } catch (error) {
        return res.send({
            success : false,
            message : error.message
        });
    }
};


module.exports = {
    userLogin,
    googleLogin,
}