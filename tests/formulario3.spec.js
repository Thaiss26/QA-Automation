import { test } from '@playwright/test';
import { Formulario3Page } from '../pages/Formulario3.page';
import { arquivos } from '../data/arquivos';

test.describe('Fluxo Completo de Upload de arquivos', () => {

  /** @type {Formulario3Page} */
  let form;

  test.beforeEach(async ({ page }) => {
    form = new Formulario3Page(page);
    await form.acessar();
  });

  test('CT01 - Verificar upload PDF inválido', async () => {
    await form.enviarArquivo(form.uploadPdf, arquivos.pdfInvalido);

    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT02 - Verificar upload PDF válido', async () => {
    await form.enviarArquivo(form.uploadPdf, arquivos.pdfValido);

    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT03 - Verificar upload DOCX inválido', async () => {
    await form.enviarArquivo(form.uploadDocx, arquivos.docxInvalido);

    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT04 - Verificar upload DOCX válido', async () => {
    await form.enviarArquivo(form.uploadDocx, arquivos.docxValido);

    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT05 - Verificar upload JPG válido', async () => {
    await form.enviarArquivo(form.uploadJpg, arquivos.jpgValido);

    await form.verificarArquivoSelecionado();
    await form.confirmarModal();
  });

  test('CT06 - Verificar upload TXT inválido', async () => {
    await form.enviarArquivo(form.uploadTxt, arquivos.txtInvalido);

    await form.verificarErro();
    await form.confirmarModal();
  });

  test('CT07 - Verificar seleção completa', async () => {
    await form.selecionarLocalizacao({
      pais: 'brasil',
      estado: 'pr',
      cidade: 'matinhos'
    });

    await form.confirmarModal();
  });

  test('CT08 - Verificar envio com campos inválidos', async () => {
    await form.enviarFormulario();

    await form.verificarCamposInvalidos();
    await form.confirmarModal();
  });

  test('CT09 - Verificar envio completo válido', async () => {

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
