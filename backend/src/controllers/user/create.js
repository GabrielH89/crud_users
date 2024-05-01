const userModel = require('../../models/user');

const isValidEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

const isValidContato = (contato) => {
    const regexContato =  /^\d{2}-\d{5}-\d{4}$/;
    return regexContato.test(contato);
}

const createUser = async (req, res) => {
    try{
        const {nome, email, contato} = req.body;
        
        if(nome === "" || email === "" || contato === "") {
            return res.status(400).json({msg: "Preencha os campos obrigatórios"});
        }

        if(!isValidEmail(email)) {
            return res.status(400).json({msg: "Email inválido"});
        }

        if(!isValidContato(contato)) {
            return res.status(400).json({msg: "Contato inválido"});
        }

        const newUser = await userModel.create({nome, email, contato});

        return res.status(201).json({ msg: `Usuário(a) ${nome} criado(a) com sucesso` });
    }catch(err){
        console.log("Error: " + err)
        return res.status(500).json({msg: "Error " + err});
    }
}

module.exports = createUser;
