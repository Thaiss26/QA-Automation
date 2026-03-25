import { expect } from "@playwright/test";
import { routes } from '../utils/routes';

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.inputUsuario = page.getByLabel("Usuário*:");
    this.inputSenha = page.getByLabel("Senha*:");
    this.checkboxSouHumano = page.getByRole("checkbox", { name: "Sou humano" });
    this.botaoEntrar = page.getByRole("button", { name: "Entrar" });
    this.botaoOk = page.getByRole("button", { name: "OK" });

    this.modalErroTitulo = page.getByRole('heading', {name: 'Erro no Login'});
    this.botaoOkModal = page.getByRole('button', { name: 'OK' });
  }

  async acessar() {
    await this.page.goto(routes.login);
  }

  async preencherUsuario(usuario) {
    await this.inputUsuario.fill(usuario);
  }

  async preencherSenha(senha) {
    await this.inputSenha.fill(senha);
  }

  async marcarSouHumano() {
    await this.checkboxSouHumano.check();
  }

  async clicarEntrar() {
    await this.botaoEntrar.click();
  }

  async clicarOK() {
    await this.botaoOk.click();
  }

  async realizarLogin(usuario, senha) {
    await this.preencherUsuario(usuario);
    await this.preencherSenha(senha);
    await this.marcarSouHumano();
    await this.clicarEntrar();
  }

  async fecharModalErro() {
    await this.botaoOkModal.click();
    await expect(this.modalErroTitulo).not.toBeVisible();
} 
  
}
