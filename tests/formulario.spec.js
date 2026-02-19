// @ts-check
import { test } from '@playwright/test';
import { FormularioPage } from '../pages/Formulario.page';

test.describe('Fluxo completo de formulário', () => {
    
    /**@type {FormularioPage} */
    let formulario;

  test.beforeEach(async ({ page }) => {
    formulario = new FormularioPage(page);
    await formulario.acessar();
  });

  test('Verificar envio do formulário com campo Sexo vazio', async () => {
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar seleção de apenas uma opção no campo Sexo', async () => {
    await formulario.selecionarSexo('Masculino');
    await formulario.selecionarSexo('Feminino');
  });

  test('Verificar impedimento de seleção simultânea das opções Masculino e Feminino', async () => {
    await formulario.selecionarSexo('Masculino');
    await formulario.selecionarSexo('Feminino');
  });

  test('Verificar envio do formulário com campo Interesses vazio', async () => {
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar seleção de apenas uma opção no campo Interesses', async () => {
    await formulario.selecionarInteresses(['Frontend']);
  });

  test('Verificar seleção de múltiplas opções no campo Interesses', async () => {
    await formulario.selecionarInteresses(['Frontend', 'Backend', 'QA']);
  });

  test('Verificar envio do formulário com campo Data de Nascimento vazio', async () => {
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação de Data de Nascimento com data futura', async () => {
    await formulario.preencherDataNascimento('2099-01-01');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação de Data de Nascimento com idade inferior a 16 anos', async () => {
    await formulario.preencherDataNascimento('2015-01-01');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar aceitação de Data de Nascimento válida com idade igual a 16 anos', async () => {
    await formulario.preencherDataNascimento('2009-01-01');
  });

  test('Verificar envio do formulário com campo Telefone vazio', async () => {
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação do campo Telefone contendo letras', async () => {
    await formulario.preencherTelefone('abc123');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação do campo Telefone com formato inválido', async () => {
    await formulario.preencherTelefone('123456');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar aceitação do campo Telefone no formato válido', async () => {
    await formulario.preencherTelefone('(99) 99999-9999');
  });

  test('Verificar envio do formulário com campo CPF vazio', async () => {
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação do campo CPF com quantidade de dígitos menor que 11', async () => {
    await formulario.preencherCPF('123');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação do campo CPF com quantidade de dígitos maior que 11', async () => {
    await formulario.preencherCPF('123456789012');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar validação do campo CPF com formato inválido', async () => {
    await formulario.preencherCPF('12345678900');
    await formulario.enviarFormulario();
    await formulario.validarModalErro();
    await formulario.fecharModalErro();
  });

  test('Verificar aceitação do campo CPF no formato válido', async () => {
    await formulario.preencherCPF('999.999.999-99');
  });

    test('Verificar envio do formulário com todos os campos obrigatórios válidos', async () => {
    await formulario.selecionarSexo('Feminino');
    await formulario.selecionarInteresses(['Frontend', 'Backend']);
    await formulario.preencherDataNascimento('2000-01-01');
    await formulario.preencherTelefone('(99) 99999-9999');
    await formulario.preencherCPF('999.999.999-99');

    await formulario.enviarFormulario();
    await formulario.validarModalSucesso();
    await formulario.fecharModalSucesso();
  });

  test('Verificar limpeza automática dos campos após envio realizado com sucesso', async () => {
    await formulario.validarCamposLimpos();
  });

});
