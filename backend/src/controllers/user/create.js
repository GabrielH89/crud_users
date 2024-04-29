const userModel = require('../../models/user');

const isValidEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

const createUser = async (req, res) => {
    try{
        const {nome, email, contato} = req.body;
        
        if(nome === "" || email === "" || contato === "") {
            return res.status(400).json({msg: "Preencha os campos obrigatórios"});
        }

        const emailExists = await userModel.findOne({where: {email} });
        if(emailExists){
            return res.status(409).json({msg: "Já existe um usuário com este e-mail, insira outro"});
        }

        if(!isValidEmail(email)) {
            return res.status(400).json({msg: "Email inválido"});
        }

        const newUser = await userModel.create({nome, email, contato});

        return res.status(201).json({ msg: `Usuário(a) ${nome} criado(a) com sucesso` });
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = createUser;
