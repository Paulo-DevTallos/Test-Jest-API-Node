// import { afterEach, beforeEach, describe } from '@jest/globals';
import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import app from '../../app';

// teste de integração
let server;

// hook de teste - antes de cada...
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json') // configurando informações no header da request - para receber JSON
      .expect('content-type', /json/) // configurando para saber o formato que está sendo respondido /json/ = regex
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResponse;
describe('POST em /editoras', () => {
  it('Deve incluir uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 'c@c.com',
      })
      .expect(201);

    idResponse = resposta.body.content.id;
  });
});

describe('Delete em /editoras/id', () => {
  it('Deve excluir uma editora', async () => {
    await request(app)
      .delete(`/editoras/${idResponse}`)
      .expect(200);
  });
});

describe('GET em /editoras/id', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResponse}`)
      .expect(200);
  });
});
