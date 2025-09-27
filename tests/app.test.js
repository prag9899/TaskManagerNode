const request = require('supertest');
const app = require('../app');

let server;

beforeAll(() => {
  server = app.listen(3001); // test server on a different port
});

afterAll(done => {
  server.close(done); // close server after tests
});

describe('Task Manager API', () => {
  it('should return 200 for health check', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toEqual(200);
  });

  it('should add a new task', async () => {
    const res = await request(server)
      .post('/tasks')
      .send({ title: 'Test Task', completed: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Task');
  });

  it('should get all tasks', async () => {
    const res = await request(server).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
