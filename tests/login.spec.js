// @ts-check
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import * as allure from "allure-js-commons";

/** @type {LoginPage} */
let login;

test.describe("Fluxo completo de login", () => {

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.acessar();
  });

  test("CT01 - Login com sucesso", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Login válido");
    await allure.severity("blocker");
    // @ts-ignore
    await allure.tag("login", "positivo");
    await allure.description("Valida login com credenciais válidas.");

    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      process.env.SENHA_VALIDA
    );

    await login.clicarOK();
  });

  test("CT02 - Login com usuário inválido", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Credenciais inválidas");
    await allure.severity("critical");
    // @ts-ignore
    await allure.tag("login", "negativo");

    await login.realizarLogin(
      process.env.EMAIL_INVALIDO,
      process.env.SENHA_INVALIDA
    );

    await login.fecharModalErro();
  });

  test("CT03 - Login com apenas Usuário preenchido", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Campo senha obrigatório");
    await allure.severity("normal");

    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      ""
    );

    await login.fecharModalErro();
  });

  test("CT04 - Login com apenas Senha preenchida", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Campo usuário obrigatório");
    await allure.severity("normal");

    await login.realizarLogin(
      "",
      process.env.SENHA_VALIDA
    );

    await login.fecharModalErro();
  });

  test("CT05 - Login com Usuário com mais de 64 caracteres", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Validação tamanho do usuário");
    await allure.severity("normal");

    const usuario = "a".repeat(65);

    await login.realizarLogin(usuario, process.env.SENHA_VALIDA);
    await login.fecharModalErro();
  });

  test("CT06 - Login com Usuário com exatamente 64 caracteres", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Limite máximo de caracteres do usuário");
    await allure.severity("minor");

    const usuario = "a".repeat(64);

    await login.realizarLogin(usuario, process.env.SENHA_VALIDA);
    await login.fecharModalErro();
  });

  test("CT07 - Login com senha com menos de 6 caracteres", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Senha curta");
    await allure.severity("critical");

    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      "Thais"
    );

    await login.fecharModalErro();
  });

  test("CT08 - Login com senha com mais de 12 caracteres", async () => {
    await allure.epic("Autenticação");
    await allure.feature("Login");
    await allure.story("Senha longa");
    await allure.severity("normal");

    await login.realizarLogin(
      process.env.EMAIL_VALIDO,
      "Thais@26112343"
    );

    await login.fecharModalErro();
  });

});
