const request = require('supertest');
const app = require('../app');
const supabase = require('../lib/supabaseClient');

describe('Authentication Endpoints', () => {
    const testUser = {
        email: `test${Date.now()}@example.com`,
        password: 'testPassword123!'
    };

    describe('POST /auth/signup', () => {
        it('should create a new user', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send(testUser);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('email', testUser.email);
        });

        it('should not create user with existing email', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send(testUser);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /auth/login', () => {
        it('should login existing user', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send(testUser);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('session');
        });

        it('should not login with wrong password', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });
}); 