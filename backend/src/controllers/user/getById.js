const userModel = require('../../models/user');

const getUserById = async (req, res) => {
    try{
        const response = await userModel.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!response){
            res.status(404).json({msg: "Usuário não encontrado"});
        }
        return res.status(200).json(response);
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = getUserById;
