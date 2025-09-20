import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth & Orders (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve logar com credenciais válidas e retornar token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(201);
    expect(response.body).toHaveProperty('access_token');
  });

  it('não deve logar com credenciais inválidas', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'wrong', password: 'wrong' })
      .expect(401);
  });

  it('não deve acessar /orders/pack sem token', async () => {
    await request(app.getHttpServer())
      .post('/orders/pack')
      .send({ pedidos: [] })
      .expect(401);
  });

  it('deve acessar /orders/pack com token válido', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(201);
    const token = loginResponse.body.access_token;
    const response = await request(app.getHttpServer())
      .post('/orders/pack')
      .set('Authorization', `Bearer ${token}`)
      .send({
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'Notebook',
                dimensoes: { altura: 5, largura: 30, comprimento: 20 },
              },
            ],
          },
        ],
      })
      .expect(200);
    expect(response.body).toHaveProperty('orders');
    expect(response.body.orders[0].orderId).toBe(1);
  });
});
