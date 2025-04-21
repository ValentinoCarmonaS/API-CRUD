const request = require('supertest');
const { app } = require('../app');
const { usersModel } = require('../models/index');

describe('Auth Endpoints', () => {

    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.user.email).toBe('test@example.com');
    });

    it('should not register a user with an existing email', async () => {
        await usersModel.create({
            name: 'Existing User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app).post('/api/auth/register').send({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.errors[0].msg).toBe('Email already exists');
    });

    it('should login a user with valid credentials', async () => {
        await usersModel.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Login successful');
        expect(res.body.data.token).toBeDefined();
    });
});