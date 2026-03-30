import { expect } from '@playwright/test';
import { routes } from '../utils/routes';

export class Formulario3Page {
    constructor(page) {
        this.page = page;

    // Uploads
    this.uploadPdf = page.getByRole('button', { name: 'Upload de Arquivo (PDF)*:' });
    this.uploadDocx = page.getByRole('button', { name: 'Upload de Arquivo (DOCX)*:' });
    this.uploadJpg = page.getByRole('button', { name: 'Upload de Arquivo (JPG)*:' });
    this.uploadXlsx = page.getByRole('button', { name: 'Upload de Arquivo (XLSX)*:' });
    this.uploadTxt = page.getByRole('button', { name: 'Upload de Arquivo (TXT)*:' });

    // Selects
    this.selectPais = page.getByLabel('País*:');
    this.selectEstado = page.getByLabel('Estado*:');
    this.selectCidade = page.getByLabel('Cidade*:');

    // Botões
    this.botaoEnviar = page.getByRole('button', { name: 'Enviar' });
    this.botaoOk = page.getByRole('button', { name: 'OK' });

    // Modais
    this.modalErro = page.getByRole('heading', { name: 'Erro no Formulário' });
    this.mensagemSucesso = page.getByText('Formulário enviado com sucesso');
    this.mensagemArquivo = page.getByText('Arquivo selecionado');
    this.mensagemCamposInvalidos = page.getByText('Existem campos inválidos.');

    }

    async acessar() {
        await this.page.goto(routes.formulario3);
    }

    async enviarArquivo(upload, arquivo) {
    await upload.setInputFiles(`tests/fixtures/${arquivo}`);
  }

  async confirmarModal() {
    await this.botaoOk.click();
  }

  async selecionarLocalizacao({ pais, estado, cidade }) {
    if (pais) await this.selectPais.selectOption(pais);
    if (estado) await this.selectEstado.selectOption(estado);
    if (cidade) await this.selectCidade.selectOption(cidade);
  }

  async enviarFormulario() {
    await this.botaoEnviar.click();
  }

  async verificarErro() {
    await expect(this.modalErro).toBeVisible();
  }

  async verificarSucesso() {
    await expect(this.mensagemSucesso).toBeVisible();
  }

  async verificarArquivoSelecionado() {
    await expect(this.mensagemArquivo).toBeVisible();
  }

  async verificarCamposInvalidos() {
    await expect(this.mensagemCamposInvalidos).toBeVisible();
  }
}