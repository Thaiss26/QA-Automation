import { test } from '@playwright/test';
import { Formulario3Page } from '../pages/Formulario3.page';
import { arquivos } from '../data/arquivos';
import * as allure from 'allure-js-commons';

test.describe('Fluxo Completo de Upload de arquivos', () => {

  /** @type {Formulario3Page} */
  let form;

  test.beforeEach(async ({ page }) => {
    form = new Formulario3Page(page);
    await form.acessar();
  });

  test('CT01 - Verificar upload PDF inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de PDF inválido');
    await allure.severity('critical');
    await allure.description('Valida que o sistema exibe erro ao enviar um PDF inválido.');
    await allure.tag('upload', 'pdf', 'negativo');

    await form.enviarArquivo(form.uploadPdf, arquivos.pdfInvalido);
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT02 - Verificar upload PDF válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de PDF válido');
    await allure.severity('normal');
    await allure.description('Valida envio de PDF válido com sucesso.');
    await allure.tag('upload', 'pdf', 'positivo');

    await form.enviarArquivo(form.uploadPdf, arquivos.pdfValido);
    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT03 - Verificar upload DOCX inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de DOCX inválido');
    await allure.severity('critical');
    await allure.description('Valida erro ao enviar DOCX inválido.');
    await allure.tag('upload', 'docx', 'negativo');

    await form.enviarArquivo(form.uploadDocx, arquivos.docxInvalido);
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT04 - Verificar upload DOCX válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de DOCX válido');
    await allure.severity('normal');
    await allure.description('Valida envio de DOCX válido.');
    await allure.tag('upload', 'docx', 'positivo');

    await form.enviarArquivo(form.uploadDocx, arquivos.docxValido);
    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT05 - Verificar upload JPG válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de JPG válido');
    await allure.severity('normal');
    await allure.description('Valida envio de imagem JPG válida.');
    await allure.tag('upload', 'jpg', 'positivo');

    await form.enviarArquivo(form.uploadJpg, arquivos.jpgValido);
    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT06 - Verificar upload TXT inválido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Upload de Arquivos');
    await allure.story('Validação de TXT inválido');
    await allure.severity('critical');
    await allure.description('Valida erro ao enviar TXT inválido.');
    await allure.tag('upload', 'txt', 'negativo');

    await form.enviarArquivo(form.uploadTxt, arquivos.txtInvalido);
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT07 - Não selecionar País', async () => {
    await allure.story('Validação campo País obrigatório');
    await allure.severity('critical');

    await form.selecionarLocalizacao({
      pais: '',
      estado: 'pr',
      cidade: 'matinhos'
    });

    await form.enviarFormulario();
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT08 - Não selecionar Estado', async () => {
    await allure.story('Validação campo Estado obrigatório');
    await allure.severity('critical');

    await form.selecionarLocalizacao({
      pais: 'brasil',
      estado: '',
      cidade: 'matinhos'
    });

    await form.enviarFormulario();
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT09- Não selecionar Cidade', async () => {
    await allure.story('Validação campo Cidade obrigatório');
    await allure.severity('critical');

    await form.selecionarLocalizacao({
      pais: 'brasil',
      estado: 'pr',
      cidade: ''
    });

    await form.enviarFormulario();
    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT10 - Verificar seleção completa', async () => {
    await allure.epic('Formulários');
    await allure.feature('Localização');
    await allure.story('Seleção completa de localização');
    await allure.severity('normal');
    await allure.description('Valida seleção correta de país, estado e cidade.');
    await allure.tag('localizacao', 'positivo');

    await form.selecionarLocalizacao({
      pais: 'brasil',
      estado: 'pr',
      cidade: 'matinhos'
    });

    await form.confirmarModal();
  });

  test('CT11 - Verificar envio com campos inválidos', async () => {
    await allure.epic('Formulários');
    await allure.feature('Validação de Campos');
    await allure.story('Envio com campos obrigatórios vazios');
    await allure.severity('critical');
    await allure.description('Valida erro ao enviar formulário sem preencher campos obrigatórios.');
    await allure.tag('formulario', 'negativo');

    await form.enviarFormulario();
    await form.verificarCamposInvalidos();
    await form.confirmarModal();
  });

  test('CT12 - Verificar envio completo válido', async () => {
    await allure.epic('Formulários');
    await allure.feature('Fluxo Completo');
    await allure.story('Envio completo com sucesso');
    await allure.severity('blocker');
    await allure.description('Valida o fluxo completo de preenchimento e envio do formulário.');
    await allure.tag('formulario', 'positivo', 'regressao');

    await form.enviarArquivo(form.uploadPdf, arquivos.pdfValido);
    await form.confirmarModal();

    await form.enviarArquivo(form.uploadDocx, arquivos.docxValido);
    await form.confirmarModal();

    await form.enviarArquivo(form.uploadJpg, arquivos.jpgValido);
    await form.confirmarModal();

    await form.enviarArquivo(form.uploadXlsx, arquivos.xlsxValido);
    await form.confirmarModal();

    await form.enviarArquivo(form.uploadTxt, arquivos.txtValido);
    await form.confirmarModal();

    await form.selecionarLocalizacao({
      pais: 'brasil',
      estado: 'pr',
      cidade: 'matinhos'
    });

    await form.confirmarModal();

    await form.enviarFormulario();
    await form.verificarSucesso();
    await form.confirmarModal();
  });


});


