// @ts-nocheck
import { test } from '@playwright/test';
import { Formulario2Page } from '../pages/Formulario2.page';
import * as allure from 'allure-js-commons';

test.describe('Fluxo completo de formulário', () => {
    
  /**@type {Formulario2Page} */
  let formulario;

  test.beforeEach(async ({ page }) => {
    formulario = new Formulario2Page(page);
    await formulario.acessar();
  });

  test('CT01 - Verificar envio com campo Sexo vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('Campo Sexo obrigatório');
    await allure.severity('critical');
    await allure.tag('formulario', 'negativo');

    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT02 - Verificar seleção única no campo Sexo', async () => {
    await allure.epic('Formulários');
    await allure.feature('Seleção');
    await allure.story('Seleção única Sexo');
    await allure.severity('normal');

    await formulario.selecionarSexo('Masculino');
    await formulario.selecionarSexo('Feminino');
  });

  test('CT03 - Verificar impedimento de seleção simultânea Sexo', async () => {
    await allure.epic('Formulários');
    await allure.feature('Seleção');
    await allure.story('Exclusividade Sexo');
    await allure.severity('critical');

    await formulario.selecionarSexo('Masculino');
    await formulario.selecionarSexo('Feminino');
  });

  test('CT04 - Verificar envio com campo Interesses vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('Campo Interesses obrigatório');
    await allure.severity('critical');

    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT05 - Verificar seleção única Interesses', async () => {
    await allure.epic('Formulários');
    await allure.feature('Seleção');
    await allure.story('Seleção única Interesses');
    await allure.severity('normal');

    await formulario.selecionarInteresses(['Frontend']);
  });

  test('CT06 - Verificar seleção múltipla Interesses', async () => {
    await allure.epic('Formulários');
    await allure.feature('Seleção');
    await allure.story('Seleção múltipla Interesses');
    await allure.severity('normal');

    await formulario.selecionarInteresses(['Frontend', 'Backend', 'QA']);
  });

  test('CT07 - Verificar envio com Data de Nascimento vazia', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('Data de nascimento obrigatória');
    await allure.severity('critical');

    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT08 - Validar Data de Nascimento futura', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Data');
    await allure.story('Data futura inválida');
    await allure.severity('critical');

    await formulario.preencherDataNascimento('2099-01-01');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT09 - Validar idade menor que 16 anos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Data');
    await allure.story('Idade mínima');
    await allure.severity('critical');

    await formulario.preencherDataNascimento('2015-01-01');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT10 - Aceitar idade igual a 16 anos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Data');
    await allure.story('Idade válida');
    await allure.severity('normal');
    await allure.tag('positivo');

    await formulario.preencherDataNascimento('2009-01-01');
  });

  test('CT11 - Verificar envio com Telefone vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('Telefone obrigatório');
    await allure.severity('critical');

    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT12 - Validar Telefone com letras', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Telefone');
    await allure.story('Formato inválido telefone');
    await allure.severity('normal');

    await formulario.preencherTelefone('abc123');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT13 - Validar Telefone inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Telefone');
    await allure.story('Formato incorreto telefone');
    await allure.severity('normal');

    await formulario.preencherTelefone('123456');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT14 - Aceitar Telefone válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Telefone');
    await allure.story('Telefone válido');
    await allure.severity('normal');
    await allure.tag('positivo');

    await formulario.preencherTelefone('(99) 99999-9999');
  });

  test('CT15 - Verificar envio com CPF vazio', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('CPF obrigatório');
    await allure.severity('critical');

    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT16 - Validar CPF com poucos dígitos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de CPF');
    await allure.story('CPF incompleto');
    await allure.severity('normal');

    await formulario.preencherCPF('123');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT17 - Validar CPF com muitos dígitos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de CPF');
    await allure.story('CPF excedente');
    await allure.severity('normal');

    await formulario.preencherCPF('123456789012');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT18 - Validar CPF inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de CPF');
    await allure.story('CPF inválido');
    await allure.severity('critical');

    await formulario.preencherCPF('12345678900');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('CT19 - Aceitar CPF válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de CPF');
    await allure.story('CPF válido');
    await allure.severity('normal');
    await allure.tag('positivo');

    await formulario.preencherCPF('999.999.999-99');
  });

  test('CT20 - Envio com todos os campos válidos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Fluxo principal');
    await allure.story('Envio com sucesso');
    await allure.severity('blocker');
    await allure.tag('positivo');

    await formulario.selecionarSexo('Feminino');
    await formulario.selecionarInteresses(['Frontend', 'Backend']);
    await formulario.preencherDataNascimento('2000-01-01');
    await formulario.preencherTelefone('92993224107');
    await formulario.preencherCPF('37364448268');

    await formulario.enviarFormulario();
    await formulario.validarModalSucesso();
    await formulario.fecharModalSucesso();
  });

  test('CT21 - Verificar limpeza dos campos após sucesso', async () => {
    await allure.epic('Formulários');
    await allure.feature('Pós-condição');
    await allure.story('Reset de formulário');
    await allure.severity('normal');

    await formulario.validarCamposLimpos();
  });

});
