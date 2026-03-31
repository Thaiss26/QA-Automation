import { expect } from '@playwright/test';
import { routes } from '../utils/routes';

export class Formulario1Page {
    constructor(page) {
        this.page = page;

    // Campos 
    this.inputLogradouro = page.getByRole('textbox', { name: 'Logradouro*:' });
    this.inputNumero = page.getByRole('textbox', { name: 'Número*:' });
    this.inputComplemento = page.getByRole('textbox', { name: 'Complemento:' });
    this.inputBairro = page.getByRole('textbox', { name: 'Bairro*:' });
    this.inputCidade = page.getByRole('textbox', { name: 'Cidade*:' });
    this.inputEstado = page.getByRole('textbox', { name: 'Estado*:' });
    this.inputCep = page.getByRole('textbox', { name: 'CEP*:' });

    this.botaoSalvar = page.getByRole('button', { name: 'Salvar' });
    this.botaoOk = page.getByRole('button', { name: 'OK' });

    // Modais 
    this.mensagemSucesso = page.getByText('Endereço cadastrado com');
    this.tituloErro = page.getByRole('heading', {
      name: 'Erro no Cadastro de Endereço'
    });

    }

    async acessar() {
        await this.page.goto(routes.formulario01);
    }

    async preencherEndereco({
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep
  }) {
    if (logradouro !== undefined) await this.inputLogradouro.fill(logradouro);
    if (numero !== undefined) await this.inputNumero.fill(numero);
    if (complemento !== undefined) await this.inputComplemento.fill(complemento);
    if (bairro !== undefined) await this.inputBairro.fill(bairro);
    if (cidade !== undefined) await this.inputCidade.fill(cidade);
    if (estado !== undefined) await this.inputEstado.fill(estado);
    if (cep !== undefined) await this.inputCep.fill(cep);
  }

  async salvar() {
    await this.botaoSalvar.click();
  }

  async validarSucesso() {
    await expect(this.mensagemSucesso).toBeVisible();
  }

  async validarErro() {
    await expect(this.tituloErro).toBeVisible();
  }

  async fecharModal() {
    await this.botaoOk.click();
  }

  // ===== VALIDAÇÕES =====
  async limparCampos() {
    await this.inputLogradouro.fill('');
    await this.inputNumero.fill('');
    await this.inputComplemento.fill('');
    await this.inputBairro.fill('');
    await this.inputCidade.fill('');
    await this.inputEstado.fill('');
    await this.inputCep.fill('');
  }
}
