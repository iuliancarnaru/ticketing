import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
  return request(app).post('/api/tickets').set('Cookie', signin()).send({
    title,
    price,
  });
};

it('can fetch a list of tickets', async () => {
  await createTicket('Concert', 20);
  await createTicket('Movie', 5);
  await createTicket('Opera', 15);

  const response = await request(app).get('/api/tickets').send().expect(200);
  expect(response.body.length).toEqual(3);
});
