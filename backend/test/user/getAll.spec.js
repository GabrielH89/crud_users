const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('getAll - user', () => {
    beforeAll(async () => {
        await userModel.destroy({ where: {} }); 
    });
    afterEach(async () => {
        await userModel.destroy({ where: { email: 'samara@gmail.com' } });
    });

    it('should return all users with success', async () => {
        //Create the user
        const response = await supertest(app).post('/users')
        .send({nome: "Samara", email: "samara@gmail.com", contato: "819837826"})
        expect(response.statusCode).toBe(201);
        
        const getAllResponses = await supertest(app).get('/users')
        .send();
        expect(getAllResponses.statusCode).toBe(200);
    });
    it('should try to get users without datas in database', async () => {
        const getAllResponses = await supertest(app).get('/users')
        .send();
        expect(getAllResponses.statusCode).toBe(404);
        expect(getAllResponses.body).toHaveProperty('msg', 'Não há usuários');
    });
})

