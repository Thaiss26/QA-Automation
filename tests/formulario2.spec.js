import { test } from '@playwright/test';
import {Formulario2Page} from '../pages/Formulario2.page';

test.describe('Fluxo de Cadastro de Endereço', () => {

  /** @type {Formulario2Page} */
  let endereco;

  test.beforeEach(async ({ page }) => {
    endereco = new Formulario2Page(page);
    await endereco.acessar();
  });

  const dadosValidos = {
    logradouro: 'Rua das Flores',
    numero: '123',
    complemento: 'Próximo ao mercado',
    bairro: 'Centro',
    cidade: 'Manaus',
    estado: 'AM',
    cep: '69096000'
  };

  test('Verificar cadastro de endereço com campos vazios', async () => {
    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Verificar cadastro com logradouro vazio', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Verificar cadastro com logradouro só números', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: '12345'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Número com letras', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: '12A'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Número vazio', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Complemento opcional', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      complemento: ''
    });

    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

  test('Bairro inválido curto', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: 'Ce'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Bairro com números', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Cidade inválida', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cidade: '12'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Estado inválido', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      estado: 'XX'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CEP com letras', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '69A00000'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CEP inválido curto', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('Cadastro válido', async () => {
    await endereco.preencherEndereco(dadosValidos);
    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

});
