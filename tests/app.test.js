const request = require('supertest');
const app = require('../app');

describe('Task Manager API', () => {
  it('should return 200 for health check', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('OK');
  });

  it('should add a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Task');
  });

  it('should get all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });
});
