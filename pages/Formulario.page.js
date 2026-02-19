 import { expect } from '@playwright/test';

export class FormularioPage {
  constructor(page) {
    this.page = page;

    // Campos
    this.radioMasculino = page.getByRole('radio', { name: 'Masculino' });
    this.radioFeminino = page.getByRole('radio', { name: 'Feminino' });

    this.checkboxFrontend = page.getByRole('checkbox', { name: 'Frontend' });
    this.checkboxBackend = page.getByRole('checkbox', { name: 'Backend' });
    this.checkboxQA = page.getByRole('checkbox', { name: 'QA' });

    this.inputDataNascimento = page.getByRole('textbox', { name: 'Data de Nascimento*:' });
    this.inputTelefone = page.getByRole('textbox', { name: 'Telefone*:' });
    this.inputCPF = page.getByRole('textbox', { name: 'CPF*:' });

    this.botaoEnviar = page.getByRole('button', { name: 'Enviar' });
    this.botaoOk = page.getByRole('button', { name: 'OK' });

    // Modais
    this.modalErro = page.getByRole('heading', { name: 'Erro no Formulário' });
    this.modalSucesso = page.getByText('Formulário enviado com sucesso');
  }

  async acessar() {
    await this.page.goto(
      'https://carlosfelixpenha-create.github.io/QAPlayground/frontend/pages/formulario-2.html'
    );
  }

  async enviarFormulario() {
    await this.botaoEnviar.click();
  }

  // ===== ERRO =====
  async validarModalErro() {
    await expect(this.modalErro).toBeVisible();
  }

  async fecharModalErro() {
    await this.botaoOk.click();
  }

  // ===== SUCESSO =====
  async validarModalSucesso() {
    await expect(this.modalSucesso).toBeVisible();
  }

  async fecharModalSucesso() {
    await this.botaoOk.click();
  }

  // ===== AÇÕES =====
  async selecionarSexo(sexo) {
    if (sexo === 'Masculino') await this.radioMasculino.check();
    if (sexo === 'Feminino') await this.radioFeminino.check();
  }

  async selecionarInteresses(interesses = []) {
    if (interesses.includes('Frontend')) await this.checkboxFrontend.check();
    if (interesses.includes('Backend')) await this.checkboxBackend.check();
    if (interesses.includes('QA')) await this.checkboxQA.check();
  }

  async preencherDataNascimento(data) {
    await this.inputDataNascimento.fill(data);
  }

  async preencherTelefone(telefone) {
    await this.inputTelefone.fill(telefone);
  }

  async preencherCPF(cpf) {
    await this.inputCPF.fill(cpf);
  }

  // ===== VALIDAÇÕES =====
  async validarCamposLimpos() {
    await expect(this.radioMasculino).not.toBeChecked();
    await expect(this.radioFeminino).not.toBeChecked();

    await expect(this.checkboxFrontend).not.toBeChecked();
    await expect(this.checkboxBackend).not.toBeChecked();
    await expect(this.checkboxQA).not.toBeChecked();

    await expect(this.inputDataNascimento).toHaveValue('');
    await expect(this.inputTelefone).toHaveValue('');
    await expect(this.inputCPF).toHaveValue('');
  }

  async limparCampos() {
    await this.page.reload();
  }
}
