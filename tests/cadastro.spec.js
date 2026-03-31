// @ts-check
import { test } from "@playwright/test";
import { CadastroPage } from "../pages/CadastroPage";
import { usuarioBase } from "../data/usuarioBase";
import * as allure from "allure-js-commons";

test.describe("Fluxo de Cadastro de Usuário", () => {
  /** @type {CadastroPage} */
  let cadastro;

  test.beforeEach(async ({ page }) => {
    cadastro = new CadastroPage(page);
    await cadastro.acessar();
  });

  test("CT01 - Verificar cadastro ao submeter formulário com todos os campos vazios", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validações de Formulário");
    await allure.story("Campos obrigatórios");
    await allure.severity("critical");
    await allure.description("Valida erro ao submeter formulário sem preencher nenhum campo.");
    // @ts-ignore
    await allure.tag("cadastro", "negativo");

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT02 - Verificar erro ao deixar apenas o campo Nome vazio", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validações de Formulário");
    await allure.story("Campo Nome obrigatório");
    await allure.severity("normal");
    // @ts-ignore
    await allure.tag("cadastro", "negativo");

    await cadastro.preencherFormulario({
      nome: "",
      email: usuarioBase.email,
      senha: usuarioBase.senha,
      confirmarSenha: usuarioBase.confirmarSenha,
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT03 - Verificar erro ao deixar apenas o campo E-mail vazio", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validações de Formulário");
    await allure.story("Campo Email obrigatório");
    await allure.severity("normal");
    // @ts-ignore
    await allure.tag("cadastro", "negativo");

    await cadastro.preencherFormulario({
      nome: usuarioBase.nome,
      email: "",
      senha: usuarioBase.senha,
      confirmarSenha: usuarioBase.confirmarSenha,
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT04 - Verificar erro ao deixar apenas o campo Senha vazio", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validações de Formulário");
    await allure.story("Campo Senha obrigatório");
    await allure.severity("critical");
    // @ts-ignore
    await allure.tag("cadastro", "negativo");

    await cadastro.preencherFormulario({
      nome: usuarioBase.nome,
      email: usuarioBase.email,
      senha: "",
      confirmarSenha: usuarioBase.confirmarSenha,
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT05 - Verificar validação do Nome com menos de 7 caracteres", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Nome");
    await allure.story("Tamanho mínimo do nome");
    await allure.severity("normal");
    // @ts-ignore
    await allure.tag("cadastro", "nome");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: "Ana",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT06 - Verificar validação do Nome com mais de 64 caracteres", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Nome");
    await allure.story("Tamanho máximo do nome");
    await allure.severity("normal");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: "A".repeat(65),
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT07 - Verificar validação do Nome contendo números", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Nome");
    await allure.story("Formato inválido do nome");
    await allure.severity("minor");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      nome: "Thais123",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT08 - Verificar validação do E-mail sem domínio válido", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Email");
    await allure.story("Formato inválido de email");
    await allure.severity("critical");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      email: "thais@teste",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT09 - Verificar validação do E-mail contendo espaços", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Email");
    await allure.story("Email com espaços");
    await allure.severity("normal");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      email: "thais teste@gmail.com",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT10 - Verificar validação da Senha com menos de 6 caracteres", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Senha");
    await allure.story("Senha curta");
    await allure.severity("critical");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      senha: "Aa1",
      confirmarSenha: "Aa1",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT11 - Verificar validação da Senha sem número", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Validação de Senha");
    await allure.story("Senha sem número");
    await allure.severity("normal");

    await cadastro.preencherFormulario({
      ...usuarioBase,
      senha: "SenhaA",
      confirmarSenha: "SenhaA",
    });

    await cadastro.submeter();
    await cadastro.validarModalErro();
    await cadastro.fecharModalErro();
  });

  test("CT12 - Verificar cadastro realizado com sucesso", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Cadastro");
    await allure.story("Cadastro com sucesso");
    await allure.severity("blocker");
    await allure.tag("positivo");

    await cadastro.preencherFormulario(usuarioBase);
    await cadastro.submeter();
    await cadastro.validarCadastroSucesso();
  });

  test("CT13 - Verificar desabilitação dos campos após cadastro com sucesso", async () => {
    await allure.epic("Cadastro de Usuário");
    await allure.feature("Cadastro");
    await allure.story("Estado pós cadastro");
    await allure.severity("normal");

    await cadastro.preencherFormulario(usuarioBase);
    await cadastro.submeter();
    await cadastro.validarCadastroSucesso();
    await cadastro.validarCamposDesabilitados();
  });
});

