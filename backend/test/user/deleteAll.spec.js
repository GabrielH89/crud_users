const supertest = require('supertest');
const app = require('../../src/app');
const userModel = require('../../src/models/user');

describe('deleteAll - users', () => {
    beforeAll(async () => {
        await userModel.bulkCreate([
            { nome: "Gabriel", email: "gabriel@gmail.com", contato: "819827393" },
            { nome: "Samara", email: "samara@gmail.com", contato: "819837826" }
        ]);
    });
    afterEach(async () => {
        await userModel.destroy({ where: {} });
    })

    it('should delete all users', async () => {
        deleteAllResponse = await (await supertest(app).delete('/users'))
        expect(deleteAllResponse.statusCode).toBe(200);
    });
    it('shoudl try to delete users withou datas in database', async () => {
        await userModel.destroy({ where: {} });

        deleteAllResponse = await (await supertest(app).delete('/users'))
        expect(deleteAllResponse.statusCode).toBe(404);
        expect(deleteAllResponse.body).toHaveProperty('msg', 'Não há usuários para excluir');
    })
})


