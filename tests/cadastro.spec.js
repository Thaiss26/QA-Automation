// @ts-check
import { test } from '@playwright/test';
import { CadastroPage } from '../pages/CadastroPage';
import { usuarioBase } from '../data/usuarioBase';

test.describe('Fluxo de Cadastro de Usuário', () => {

  /** @type {CadastroPage} */
  let cadastro;

  test.beforeEach(async ({ page }) => {
    cadastro = new CadastroPage(page);
    await cadastro.acessar();
  });

  test('Verificar cadastro ao submeter formulário com todos os campos vazios', async () => {
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar erro ao deixar apenas o campo Nome vazio', async () => {
    await cadastro.preencherFormulario({
      nome: '',
      email: usuarioBase.email,
      senha: usuarioBase.senha,
      confirmarSenha: usuarioBase.confirmarSenha
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar erro ao deixar apenas o campo E-mail vazio', async () => {
    await cadastro.preencherFormulario({
      nome: usuarioBase.nome,
      email: '',
      senha: usuarioBase.senha,
      confirmarSenha: usuarioBase.confirmarSenha
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar erro ao deixar apenas o campo Senha vazio', async () => {
    await cadastro.preencherFormulario({
      nome: usuarioBase.nome,
      email: usuarioBase.email,
      senha: '',
      confirmarSenha: usuarioBase.confirmarSenha
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação do Nome com menos de 7 caracteres', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: 'Ana'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação do Nome com mais de 64 caracteres', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: 'A'.repeat(65)
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação do Nome contendo números', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: 'Thais123'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação do E-mail sem domínio válido', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      email: 'thais@teste'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação do E-mail contendo espaços', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      email: 'thais teste@gmail.com'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação da Senha com menos de 6 caracteres', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      senha: 'Aa1',
      confirmarSenha: 'Aa1'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar validação da Senha sem número', async () => {
    await cadastro.preencherFormulario({
      ...usuarioBase,
      senha: 'SenhaA',
      confirmarSenha: 'SenhaA'
    });
    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test('Verificar cadastro realizado com sucesso', async () => {
    await cadastro.preencherFormulario(usuarioBase);
    await cadastro.submeter();
    await cadastro.validarCadastroSucesso();
  });

  test('Verificar desabilitação dos campos e do botão após cadastro com sucesso', async () => {
    await cadastro.preencherFormulario(usuarioBase);
    await cadastro.submeter();
    await cadastro.validarCadastroSucesso();
    await cadastro.validarCamposDesabilitados();
  });

});
  