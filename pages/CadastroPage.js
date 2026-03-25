import { expect } from '@playwright/test';
import { routes } from '../utils/routes';

export class CadastroPage {
  constructor(page) {
    this.page = page;

    // Inputs
    this.inputNome = page.getByRole('textbox', { name: 'Nome*:' });
    this.inputEmail = page.getByRole('textbox', { name: 'E-mail*:' });
    this.inputSenha = page.getByRole('textbox', { name: 'Senha*:', exact: true });
    this.inputConfirmarSenha = page.getByRole('textbox', {
      name: 'Confirmar sua senha*:'
    });

    // Botões
    this.botaoCadastrar = page.getByRole('button', { name: 'Cadastrar' });
    this.botaoOK = page.getByRole('button', { name: 'OK' });

    // Modal
    this.tituloErro = page.getByRole('heading', { name: 'Erro no Cadastro' });
    this.mensagemSucesso = page.getByText('Cadastro realizado com');
  }

  async limparEstadoDaAplicacao() {
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  async acessar() {
    await this.page.goto(routes.cadastro); // puxa dos routes
    await this.limparEstadoDaAplicacao();
    await this.page.reload();
  }

  async preencherFormulario({ nome, email, senha, confirmarSenha }) {
    if (nome !== undefined) await this.inputNome.fill(nome);
    if (email !== undefined) await this.inputEmail.fill(email);
    if (senha !== undefined) await this.inputSenha.fill(senha);
    if (confirmarSenha !== undefined) {
      await this.inputConfirmarSenha.fill(confirmarSenha);
    }
  }

  async submeter() {
    await this.botaoCadastrar.click();
  }

  async validarModalErro() {
    await expect(this.tituloErro).toBeVisible({ timeout: 5000 });
  }

  async fecharModalErro() {
    await expect(this.botaoOK).toBeVisible();
    await this.botaoOK.click();
  }

  async validarCadastroSucesso() {
    await expect(this.mensagemSucesso).toBeVisible();
  }

  async validarCamposDesabilitados() {
    await expect(this.inputNome).toBeDisabled();
    await expect(this.inputEmail).toBeDisabled();
    await expect(this.inputSenha).toBeDisabled();
    await expect(this.inputConfirmarSenha).toBeDisabled();
    await expect(this.botaoCadastrar).toBeDisabled();
  }

  async limparCampos() {
    await this.inputNome.clear();
    await this.inputEmail.clear();
    await this.inputSenha.clear();
    await this.inputConfirmarSenha.clear();
  }
}
