const getAllUser = require('./user/getAll');
const getUserById = require('./user/getById');
const createUser = require('./user/create');
const deleteUserById = require('./user/deleteById');
const deleteAll = require('./user/deleteAll');

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    deleteUserById,
    deleteAll
};
