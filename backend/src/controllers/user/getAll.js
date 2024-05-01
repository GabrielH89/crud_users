const userModel = require('../../models/user');

const getAllUser = async (req, res) => {
    try{
        const users = await userModel.findAll();

        if(users.length === 0){
            return res.status(404).json({msg: "Não há usuários"});
        }

        return res.status(200).json({msg: users});
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = getAllUser;