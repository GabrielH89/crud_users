const { Op } = require('sequelize');
const userModel = require('../../models/user');

const isValidEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return regexEmail.test(email);
}

const isValidContato = (contato) => {
    const regexContato =  /^\d{2}-\d{5}-\d{4}$/;
    return regexContato.test(contato);
}

const updateById = async (req, res) => {
    try {
        const {nome, email, contato} = req.body;
        
        if(nome === "" || email === "" || contato === ""){
            return res.status(400).json({msg: "Preencha todos os campos"});
        }

        const emailExists = await userModel.findOne({
            where: {
                email, 
                id: { [Op.not]: req.params.id}
            } 
        });

        if(!isValidEmail(email)) {
            return res.status(400).json({msg: "Insira um email válido"});
        }

        // Verifica se o contato é válido
        if(!isValidContato(contato)) {
            return res.status(400).json({msg: "Insira um contato válido"});
        }

        const response = await userModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!response) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        if (nome) response.nome = nome;
        if (email) response.email = email;
        if (contato) response.contato = contato;

        // Salva as alterações no banco de dados
        await response.save();

        res.status(200).json({ msg: "Usuário atualizado com sucesso" });
    } catch (err) {
        console.error("Error: " + err);
        return res.status(500).json({ msg: "Error " + err });
    }
};

module.exports = updateById;
