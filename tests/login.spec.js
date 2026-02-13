// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Fluxo completo de login", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.acessar();
  });

  test("Login com sucesso", async ({ page }) => {
    const login = new LoginPage(page);

    await login.realizarLogin('thais.teste26@gmail.com', 'Thais@26');

    await login.clicarOK();
  });

  test ("Login com usuário inválido", async ({page}) => {
    const login = new LoginPage (page);

    await login.realizarLogin('thais.silva26@gmail.com', 'Thais@25');
    await login.fecharModalErro();

  })

  test("Login com apenas Usuário preenchido", async ({page}) => {
    const login = new LoginPage(page);

    await login.acessar()
    await login.realizarLogin('thais.teste26@gmail.com', '')
    await login.fecharModalErro();
  })

  test("Login com apenas Senha preenchida", async ({page}) => {
    const login = new LoginPage(page);

    await login.acessar()
    await login.realizarLogin('', 'Thais@26')
    await login.fecharModalErro();
  })

  test('Login com Usuário com mais de 64 caracteres', async ({ page }) => {
    const login = new LoginPage(page);

    const usuario = 'a'.repeat(65);
    await login.realizarLogin(usuario, 'Thais@26');
    await login.fecharModalErro();
  });

   test('Login com Usuário com exatamente 64 caracteres', async ({ page }) => {
    const login = new LoginPage(page);

    const usuario = 'a'.repeat(64);
    await login.realizarLogin(usuario, 'Thais@26');
    await login.fecharModalErro();
  });

  test('Login com senha com menos de 6 caracteres', async ({ page }) => {
    const login = new LoginPage(page);

    await login.realizarLogin('thais.teste26@gmail.com', 'Thais');
    await login.fecharModalErro();
  });

  test('Login com senha com mais de 12 caracteres', async ({ page }) => {
    const login = new LoginPage(page);

    await login.realizarLogin('thais.teste26@gmail.com', 'Thais@26112343');
    await login.fecharModalErro();
  });

});
