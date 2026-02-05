const User = require("../models/User.model")
const { resp } = require("../helpers"); 

exports.updateUserProfile = async (req, res) => {
    const user = await User.find( {number: req.token.number} );
    if(!user){
        return resp(res, 400, "User not found");
    }
    user.name = req.body.name;
    user.save();
    resp(res, 200, "User updated successfully", user);
}