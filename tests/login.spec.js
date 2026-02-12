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

  test("Login com campo usuário vazio", async ({ page }) => {
    const login = new LoginPage(page);
    
    await login.acessar()
    await login.realizarLogin('', 'Thais@26');
    await login.fecharModalErro();
  });

  test("Login com apenas Usuário preenchido", async ({page}) => {
    const login = new LoginPage(page);

    await login.acessar()
    await login.realizarLogin('thais.teste26@gmail.com', '')
    await login.fecharModalErro();
  })
  
});
