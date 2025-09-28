const request = require('supertest');
const { startServer, stopServer } = require('../app');

let server;

beforeAll(async () => {
    server = await startServer(3000);
});

afterAll(async () => {
    await stopServer();
});

describe('Task Manager API', () => {
    it('should return 200 for health check', async () => {
        const res = await request(server).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Server is healthy');
    });

    it('should add a new task', async () => {
        const res = await request(server)
            .post('/tasks')
            .send({ title: 'Test Task', description: 'Task description' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Task');
    });

    it('should get all tasks', async () => {
        const res = await request(server).get('/tasks');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
});
