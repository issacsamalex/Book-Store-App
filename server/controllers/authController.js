const User = require('../models/usersModel');

const loggedInUser = async (req, res) => {
    try {
        const user = await User.findById(req.body.userIdFromToken);
        if(!user){
            return res.send({
                success : false,
                message : "User does not exist",
            });
        }
        return res.send({
            success : true,
            message : "User details fetched successfully",
            data : user,
        });
    } catch (error) {
        return res.send({
            success : false,
            message : error.message,
        });
    }
}

module.exports = {
    loggedInUser
}