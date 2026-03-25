// @ts-check
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";


/** @type {LoginPage} */
let login;

test.describe("Fluxo completo de login", () => {

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.acessar();
  });

  test("Login com sucesso", async () => {
    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      process.env.SENHA_VALIDA
    );

    await login.clicarOK();
  });

  test("Login com usuário inválido", async () => {
    await login.realizarLogin(
      process.env.EMAIL_INVALIDO,
      process.env.SENHA_INVALIDA
    );

    await login.fecharModalErro();
  });

  test("Login com apenas Usuário preenchido", async () => {
    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      ""
    );

    await login.fecharModalErro();
  });

  test("Login com apenas Senha preenchida", async () => {
    await login.realizarLogin(
      "",
      process.env.SENHA_VALIDA
    );

    await login.fecharModalErro();
  });

  test("Login com Usuário com mais de 64 caracteres", async () => {
    const usuario = "a".repeat(65);

    await login.realizarLogin(usuario, process.env.SENHA_VALIDA);
    await login.fecharModalErro();
  });

  test("Login com Usuário com exatamente 64 caracteres", async () => {
    const usuario = "a".repeat(64);

    await login.realizarLogin(usuario, process.env.SENHA_VALIDA);
    await login.fecharModalErro();
  });

  test("Login com senha com menos de 6 caracteres", async () => {
    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      "Thais"
    );

    await login.fecharModalErro();
  });

  test("Login com senha com mais de 12 caracteres", async () => {
    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      "Thais@26112343"
    );

    await login.fecharModalErro();
  });
});
