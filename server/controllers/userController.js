const User = require('../models/usersModel');
const bcrypt = require("bcryptjs");



// get all Users(book renting users)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role }).sort({ createdAt : -1});
        return res.send({
            success: true,
            message: "Users found successfully",
            data: users,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
};

// Get users by Id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }
            return res.send({
                success: true,
                message: "User fetched successfully",
                data: user,
            });
        
    } catch (error) {
        return res.send({
            success: false,
            message: "User does not exist",
        })
    }
};

// Update user Info
const updateUser = async (req, res) => {
    try {
        if(req.body.newPassword && req.body.oldPassword){
            const oldPassword = req.body.oldPassword;
            const user = await User.findById(req.body._id);
            const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
            if(!isPasswordCorrect) throw new Error("Incorrect old password");

            const newPassword = await bcrypt.hash(req.body.newPassword, 10);
            req.body.password = newPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body, {new: true}).select("-password");
        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updatedUser,
          });
    } catch (error) {
        res.status(401).send({ message: error.message, success: false });
    }
};

// Delete User by admin
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.send({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(401).send({ message: error.message, success: false });
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}