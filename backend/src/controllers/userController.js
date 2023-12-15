const getAllUser = require('./user/getAll');
const getUserById = require('./user/getById');
const createUser = require('./user/create');
const updateUserById = require('./user/updateById')
const deleteUserById = require('./user/deleteById');
const deleteAll = require('./user/deleteAll');

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    deleteAll
};
