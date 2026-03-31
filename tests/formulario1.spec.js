import { test } from '@playwright/test';
import {Formulario1Page} from '../pages/Formulario1.page';
import * as allure from 'allure-js-commons';

test.describe('Fluxo de Cadastro de Endereço', () => {

  /** @type {Formulario1Page} */
  let endereco;

  test.beforeEach(async ({ page }) => {
    endereco = new Formulario1Page(page);
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
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de campos obrigatórios');
    await allure.severity('critical');
    await allure.description('Valida erro ao tentar cadastrar endereço com todos os campos vazios.');
    await allure.tag('endereco', 'negativo');

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT02 - Verificar cadastro com logradouro vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de logradouro');
    await allure.severity('critical');
    await allure.description('Valida erro ao deixar o campo logradouro vazio.');
    await allure.tag('logradouro', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT03 - Verificar cadastro com logradouro só números', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de logradouro inválido');
    await allure.severity('normal');
    await allure.description('Valida erro ao preencher logradouro apenas com números.');
    await allure.tag('logradouro', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      logradouro: '12345'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT04 - Verificar se é possivel cadatrar número com letras', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de número inválido');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir letras no campo número.');
    await allure.tag('numero', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: '12A'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT05 - Verificar se é possivel cadastrar com Número vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de número obrigatório');
    await allure.severity('critical');
    await allure.description('Valida erro ao deixar o campo número vazio.');
    await allure.tag('numero', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      numero: ''
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT06 - Verificar se é possivel cadastrar complemento opcional', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Campo opcional complemento');
    await allure.severity('minor');
    await allure.description('Valida cadastro com campo complemento vazio.');
    await allure.tag('complemento', 'positivo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      complemento: ''
    });

    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

  test('CT07- Bairro inválido curto', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de bairro');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir bairro com tamanho insuficiente.');
    await allure.tag('bairro', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: 'Ce'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT08- Verificar se é possivel cadastrar Bairro com números', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de bairro inválido');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir números no campo bairro.');
    await allure.tag('bairro', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      bairro: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT09- Verificar se é possivel cadastrar com Cidade inválida', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de cidade');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir cidade inválida.');
    await allure.tag('cidade', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      cidade: '12'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT10 - Verificar cadastro com Estado inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de estado');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir estado inválido.');
    await allure.tag('estado', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      estado: 'XX'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT11- Verificar se é possivel cadastrar CEP com letras', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de CEP');
    await allure.severity('critical');
    await allure.description('Valida erro ao inserir CEP com letras.');
    await allure.tag('cep', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '69A00000'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT12- Verificar se é possivel cadastrar CEP inválido curto', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Validação de CEP curto');
    await allure.severity('normal');
    await allure.description('Valida erro ao inserir CEP com tamanho inválido.');
    await allure.tag('cep', 'negativo');

    await endereco.preencherEndereco({
      ...dadosValidos,
      cep: '123'
    });

    await endereco.salvar();
    await endereco.validarErro();
    await endereco.fecharModal();
  });

  test('CT13 - Cadastro válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Cadastro de Endereço');
    await allure.story('Cadastro com dados válidos');
    await allure.severity('blocker');
    await allure.description('Valida cadastro de endereço com dados válidos.');
    await allure.tag('endereco', 'positivo');

    await endereco.preencherEndereco(dadosValidos);
    await endereco.salvar();
    await endereco.validarSucesso();
    await endereco.fecharModal();
  });

});
