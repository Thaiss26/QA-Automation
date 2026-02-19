# QA-Automation

Projeto de automação de testes end-to-end utilizando **Playwright**, aplicado aos formulários e fluxos do **QA Playground**. 

O objetivo deste projeto é validar regras de negócio, campos obrigatórios, mensagens de erro, fluxos de sucesso e comportamento da interface, seguindo boas práticas da qualidade de software.

# Tecnologias Utilizadas

* [Node.js](https://nodejs.org/)
* [Playwright](https://playwright.dev/)
* JavaScript
* Page Object Model (POM)
* Git & GitHub

# Pré-Requisitos 

Antes de iniciar, você precisa ter instalado:

* Node.js (versão 18 ou superior)
* npm (instalado junto com o Node)
* Git
Verifique com:
```bash
node -v
npm - v
git --version
```

# Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

# Instalando dependências

```bash
npm install
```
Isso irá instalar automaticamente:

* npm init playwright@latest

* Browsers necessários (Chromium, Firefox, WebKit)

Caso precise instalar os navegadores manualmente:

```bash
npx playwright install
```
# Executando os testes 

* Executando todos os testes
```bash
npx playwright test
```
* Executar um teste específico

```bash
npx playwright test cadastro.spec.js
```
* Executar em modo debug

```bash
npx playwright test --debug
```

# Relatório de Testes 

Após a execução, visualize o relatório HTML com:

```bash
npx playwright show-report
```


# Aplicação Testada

QA Playground – Carlos Felix Penha
🔗 https://carlosfelixpenha-create.github.io/QAPlayground/