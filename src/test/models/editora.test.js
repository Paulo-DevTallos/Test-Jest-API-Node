import { describe, expect, it, jest } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando o modelo editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com.br',
  };

  it('Deve instanciar uma nova editora', () => {
    const editoria = new Editora(objetoEditora);

    expect(editoria).toEqual(
      expect.objectContaining(objetoEditora) //esperamos que esse objeto contenha
    ) 
  })

  //testando funções asincronas
  it.skip('Deve salvar editora no banco de dados', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then(dados => {
      expect(dados.nome).toBe('CDC'); 
    });
  });

  it.skip('Deve salvar no banco usando a sintaxe moderna', async () => {
    const editra = new Editora(objetoEditora);

    const dados = await editra.salvar()

    const retornado = await Editora.pegarPeloId(dados.id)

    expect(retornado).toEqual(
      expect.objectContaining({ 
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
       })
    )
  })

  it('Deve fazer uma chamada simulada ao DB', () => {
    const editora = new Editora(objetoEditora)

    editora.salvar = jest.fn().mockReturnValue({ 
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com.br',
      created_at: '2022-02-02',
      updated_at: '2022-06-01',
    }); //retorna um valor especifico

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({ 
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
       })
    )
  })
});