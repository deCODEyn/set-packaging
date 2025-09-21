import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    // Faz login para pegar o token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
      .expect(201);
    token = loginRes.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/orders/pack (POST) - deve devolver pedidos embalados', async () => {
    const input = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            {
              produto_id: 'PS5',
              dimensoes: { altura: 40, largura: 10, comprimento: 25 },
            },
            {
              produto_id: 'Volante',
              dimensoes: { altura: 40, largura: 30, comprimento: 30 },
            },
          ],
        },
      ],
    };
    const response = await request(app.getHttpServer())
      .post('/orders/pack')
      .set('Authorization', `Bearer ${token}`)
      .send(input)
      .expect(200);
    expect(response.body.orders).toBeDefined();
    expect(response.body.orders[0].boxes.length).toBeGreaterThan(0);
    expect(response.body.orders[0].orderId).toBe(1);
  });
});
