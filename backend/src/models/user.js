const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/connection');

const UserModel = connection.define('user', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING
    }
}, {

});

/*try{
    UserModel.sync();
    console.log("Table created with success");
}catch(err){
    console.log("Error: " + err);
}*/

module.exports = UserModel;









