# Tutorial — Instalar Node.js

Guia completo para instalar o Node.js em diferentes sistemas operacionais.

---

## Windows

### Método 1: Instalador Oficial (Recomendado)

1. Acesse [nodejs.org/pt-br/download](https://nodejs.org/pt-br/download/)
2. Baixe o instalador **LTS** (versão 18.x ou superior)
3. Execute o arquivo `.msi` baixado
4. Siga o assistente de instalação:
   - Aceite os termos de licença
   - Escolha o local de instalação (padrão: `C:\Program Files\nodejs\`)
   - Marque "Automatically install necessary tools..."
5. Clique em "Install"
6. Aguarde a instalação finalizar
7. Clique em "Finish"

### Verificar instalação

Abra o **Prompt de Comando** ou **PowerShell**:

```powershell
node -v
npm -v
```

Deve aparecer algo como:
```
v20.10.0
10.2.0
```

### Vídeo tutorial

[![Node.js Windows](https://img.youtube.com/vi/Mh3IOUh7MvM/0.jpg)](https://www.youtube.com/watch?v=Mh3IOUh7MvM)

---

## macOS

### Método 1: Homebrew (Recomendado)

```bash
# Instalar Homebrew se não tiver
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node@18

# Ou última versão LTS
brew install node
```

### Verificar instalação

```bash
node -v
npm -v
```

### Método 2: Instalador Oficial

1. Acesse [nodejs.org/pt-br/download/](https://nodejs.org/pt-br/download/)
2. Baixe o instalador macOS (.pkg)
3. Execute e siga as instruções

---

## Linux (Ubuntu/Debian)

### Método 1: NodeSource (Recomendado)

```bash
# Adicionar repositório Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar
sudo apt-get install -y nodejs

# Verificar
node -v
npm -v
```

### Método 2: APT padrão

```bash
sudo apt update
sudo apt install -y nodejs npm

# Verificar
node -v
npm -v
```

### Método 3: NVM (Gerenciador de versões)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar terminal
source ~/.bashrc

# Instalar Node.js LTS
nvm install --lts

# Usar versão LTS
nvm use --lts

# Verificar
node -v
```

---

## Resolver problemas comuns

### "node não encontrado" após instalação

**Windows:**
- Reinicie o computador
- Verifique se adicionou ao PATH

**Mac/Linux:**
```bash
# Adicionar ao PATH manualmente
export PATH="$PATH:/usr/local/bin"
source ~/.bashrc
```

### Permissão negada (EACCES)

**Mac/Linux:**
```bash
# Criar diretório global
mkdir ~/npm-global

# Configurar
npm config set prefix '~/npm-global'

# Adicionar ao PATH
echo 'export PATH=~/npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Links úteis

- Site oficial: https://nodejs.org/pt-br/
- Documentação: https://nodejs.org/docs/
- NPM Registry: https://www.npmjs.com/
