const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('deleteById - user', () => {
    beforeAll(async () => {
        await userModel.create({nome: "Gabroiel", email: "gabriel@gmail.com", contato: "81984117124"})
    });
    afterEach(async () => {
        await userModel.destroy({ where: {email: "gabriel@gmail.com"}});
    });

    it('should delete a user by id with success', async () => {
        const createUser = await userModel.findOne({ where: {email: "gabriel@gmail.com"}});
        const deleteResponseById = await supertest(app).delete(`/users/${createUser.id}`);
        expect(deleteResponseById.statusCode).toBe(200);
    });
    it('should try to delete a user with an invalid id', async () => {
        const deleteResponseById = await supertest(app).delete('/users/999');
        expect(deleteResponseById.statusCode).toBe(404);
    })
})


