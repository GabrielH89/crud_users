const userModel = require('../../models/user');

const createUser = async (req, res) => {
    try{
        const {nome, email, telefone} = req.body;
        if(nome === null || email === null){
            return res.status(400).json({msg: "Preencha todos os campos"});
        }

        const emailExists = await userModel.findOne({where: {email} });
        if(emailExists){
            return res.status(409).json({msg: "Já existe um usuário com este e-mail, insira outro"});
        }

        const newUser = await userModel.create({nome, email, telefone});

        return res.status(201).json({ msg: `Usuário(a) ${nome} criado(a) com sucesso` });
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = createUser;
