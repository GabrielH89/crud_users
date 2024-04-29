const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('create - user ', () => {
    afterEach(async () => {
        // Excluir o usuário com o email específico após cada teste
        await userModel.destroy({ where: { email: 'gabriel@gmail.com' } });
    });

    it('should create an user with success', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" });

        expect(response.statusCode).toBe(201);
    });
    it('should try to create an user with an exist email in the database', async () => {
        await userModel.create({nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" });
        
        const response = await supertest(app).post('/users')
        .send({nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" })
        expect(response.statusCode).toBe(409); 
    });
    it('should try to create an user with empty fields', async () => {
        const response = await supertest(app).post('/users')
        .send({nome: "", email: "", contato: ""});
        expect(response.statusCode).toBe(400);
    });
    it('should try to create an user with with nome field empty', async () => {
        const response = await supertest(app).post('/users')
        .send({nome: "", email: "gabriel@gmail.com", contato: "81983736"});
        expect(response.statusCode).toBe(400);
    });
    it('should try to create an user with an invalid email', async () => {
        const response = await supertest(app).post('/users')
        .send({nome: "Gabriel", email: "gabrielgmailcom", contato: "81983736"});
        expect(response.statusCode).toBe(400);
    });
});
