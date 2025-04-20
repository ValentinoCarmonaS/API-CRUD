const request = require('supertest');
const { app } = require('../src/app');
const { usersModel } = require('../src/models/index');
const jwt = require('jsonwebtoken');

describe('Users Endpoints', () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Crear un usuario y generar un token para las pruebas
        const user = await usersModel.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });
        userId = user._id;
        token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    });

    afterAll(async () => {
        // Limpiar la colección de usuarios después de las pruebas
        await usersModel.deleteMany({});
    });

    it('should fetch all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.users.length).toBeGreaterThan(0);
    });

    it('should fetch a user by ID', async () => {
        const res = await request(app)
            .get(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe('admin@example.com');
    });

    it('should update a user by ID', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated Admin' });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.name).toBe('Updated Admin');
    });

    it('should delete a user by ID', async () => {
        const res = await request(app)
            .delete(`/api/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });
});