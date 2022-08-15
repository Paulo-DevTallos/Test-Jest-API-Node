// import { afterEach, beforeEach, describe } from '@jest/globals';
import {
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
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
  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET em /editoras/id', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(app)
      .get(`/editoras/${idResponse}`)
      .expect(200);
  });
});

// aplicando atalho para testar cada elemento
/* pega cada elemento do array e roda os testes separadamente! */
describe('PUT em /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Casa do código' }],
    ['cidade', { cidade: 'Fortaleza' }],
    ['email', { email: 'e@email.com' }],
  ])('Deve alterar o campo nome %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await request(app)
      .put(`/editoras/${idResponse}`)
      .send(param)
      .expect(204);

    expect(spy).toHaveBeenCalled();
  });
});

describe('Delete em /editoras/id', () => {
  it('Deve excluir uma editora', async () => {
    await request(app)
      .delete(`/editoras/${idResponse}`)
      .expect(200);
  });
});
