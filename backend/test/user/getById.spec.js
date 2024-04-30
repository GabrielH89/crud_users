const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('getById - user', () => {
    beforeAll(async () => {
        // Crie um usuário na base de dados para teste
        await userModel.create({ nome: "Samara", email: "samara@gmail.com", contato: "819837826" });
    });

    afterEach(async () => {
        await userModel.destroy({ where: { email: 'samara@gmail.com' } });
    });

    it('should return user by id', async () => {
        // Crie um usuário para buscar pelo ID
        const createdUser = await userModel.findOne({ where: { email: 'samara@gmail.com' } });
        const getResponseById = await supertest(app).get(`/users/${createdUser.id}`);
        expect(getResponseById.statusCode).toBe(200);
    });

    it('should return 404 if user not found', async () => {
        const getResponseById = await supertest(app).get('/users/999');
        expect(getResponseById.statusCode).toBe(404);
    });
});
