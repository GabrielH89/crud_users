const userModel = require('../../models/user');

const deleteAll = async (req, res) => {
    try{
        const users = await userModel.findAll();
        if(users.length === 0){
            return res.status(404).json({msg: "Não há usuários para excluir"});
        }

        await userModel.destroy({
            where: {}
        });
        return res.status(200).json({msg: "Usuários deletados com sucesso"});
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = deleteAll;

