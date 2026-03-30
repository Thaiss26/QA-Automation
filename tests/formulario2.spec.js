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

  test('CT01 - Verificar cadastro de endereço com campos vazios', async () => {
    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT02 - Verificar cadastro com logradouro vazio', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT03 - Verificar cadastro com logradouro só números', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: '12345'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT04 - Verificar se é possivel cadatrar número com letras', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: '12A'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT05 - Verificar se é possivel cadastrar com Número vazio', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT06 - Verificar se é possivel cadastrar complemento opcional', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      complemento: ''
    });

    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

  test('CT07- Bairro inválido curto', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: 'Ce'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT08- Verificar se é possivel cadastrar Bairro com números', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT09- Verificar se é possivel cadastrar com Cidade inválida', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cidade: '12'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT10 - Verificar cadastro com Estado inválido', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      estado: 'XX'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT11- Verificar se é possivel cadastrar CEP com letras', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '69A00000'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT12- Verificar se é possivel cadastrar CEP inválido curto', async () => {
    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT13 - Cadastro válido', async () => {
    await endereco.preencherEndereco(dadosValidos);
    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

});
