const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('updateById - user', () => {
   
    afterEach(async () => {
        await userModel.destroy({ where: {} });
    });

    it('should update an user with success', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "Amanda", email: "amanda@gmail.com", contato: "81-97341-5665"});
        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body).toHaveProperty('msg', 'Usuário atualizado com sucesso');
    });
    it('should try to update a user with all fields empty', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "", email: "", contato: ""});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Preencha todos os campos');
    });
    it('should try to update a user with an emtpy nome field', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81983736" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "", email: "gisele@gmail.com", contato: "81-97341-5665"});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Preencha todos os campos');
    });
    it('should try to update a user with an emtpy email field', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81-97341-5665" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "Gisele", email: "", contato: "81-97341-5665"});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Preencha todos os campos');
    });
     it('should try to update a user with an emtpy contato field', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81-97341-5665" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "Gisele", email: "gisele@gmail.com", contato: ""});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Preencha todos os campos');
    });
    it('should try to update a user with an invalid email', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81-97341-5665" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "Gisele", email: "giselegmailcom", contato: "81-97362-1235"});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Insira um email válido');
    });
    it('should try to update a user with an invalid contato', async () => {
        const response = await supertest(app).post('/users')
        .send({ nome: "Gabriel", email: "gabriel@gmail.com", contato: "81-97341-5665" });
        expect(response.statusCode).toBe(201);

        const findResponse = await userModel.findOne({ where: {email: "gabriel@gmail.com"}}); 
        const updateResponse = await supertest(app).put(`/users/${findResponse.id}`)
        .send({nome: "Gisele", email: "gisele@gmail.com", contato: "81973621235"});
        expect(updateResponse.statusCode).toBe(400);
        expect(updateResponse.body).toHaveProperty('msg', 'Insira um contato válido');
    });
    it('should try to update a user that does not exist in database', async () => {
        const updateResponse = await supertest(app).put('/users/999') 
        .send({nome: "Gisele", email: "gisele@gmail.com", contato: "81-97362-1235"});
        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body).toHaveProperty('msg', 'Usuário não encontrado');
    });
})

