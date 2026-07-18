# Tutorial — Instalar Docker

Guia completo para instalar o Docker em diferentes sistemas operacionais.

---

## Windows

### Requisitos

- Windows 10/11 Pro, Enterprise ou Education
- WSL 2 habilitado
- 4GB RAM mínimo
- Virtualização habilitada na BIOS

### Instalação (Docker Desktop)

1. **Habilitar WSL 2** (se não estiver):
   ```powershell
   # Abra PowerShell como Administrador
   wsl --install
   # Reinicie o computador
   ```

2. Baixe o Docker Desktop:
   - https://docs.docker.com/desktop/install/windows-install/

3. Execute o instalador (`Docker Desktop Installer.exe`)

4. Durante a instalação:
   - Marque "Use WSL 2 instead of Hyper-V"
   - Aguarde a instalação

5. **Reinicie o computador**

6. Abra o Docker Desktop

7. Verifique na bandeja do sistema (ícone de baleia)

### Verificar instalação

Abra **PowerShell**:

```powershell
docker --version
docker compose version
```

Deve aparecer:
```
Docker version 24.0.7, build afdd53b
Docker Compose version v2.20.0
```

### Testar

```powershell
docker run hello-world
```

### Vídeo tutorial

[![Docker Windows](https://img.youtube.com/vi/c2QZ5Vpl1BY/0.jpg)](https://www.youtube.com/watch?v=c2QZ5Vpl1BY)

---

## macOS

### Requisitos

- Mac com chip Intel ou Apple Silicon
- macOS 10.15 (Catalina) ou superior
- 4GB RAM mínimo

### Instalação (Docker Desktop)

1. Baixe o Docker Desktop:
   - https://docs.docker.com/desktop/install/mac-install/

2. Clique duas vezes no `.dmg` baixado

3. Arraste o ícone do Docker para a pasta Applications

4. Abra o Docker Desktop

5. Aguarde o ícone na barra de menus estar verde

### Homebrew (alternativa)

```bash
brew install --cask docker
open -a Docker
```

### Verificar

```bash
docker --version
docker compose version
```

---

## Linux (Ubuntu/Debian)

### Instalação rápida

```bash
# Atualizar sistema
sudo apt update
sudo apt upgrade -y

# Instalar dependências
sudo apt install -y ca-certificates curl gnupg lsb-release

# Adicionar chave GPG
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Adicionar repositório
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Iniciar serviço
sudo systemctl start docker
sudo systemctl enable docker
```

### Verificar

```bash
docker --version
docker compose version
sudo docker run hello-world
```

---

## Resolver problemas comuns

### Docker não inicia (Windows)

```powershell
# Reiniciar serviços
Restart-Service com.docker.service
Restart-Service containers

# Ou via Docker Desktop
# Clique direito → Troubleshoot → Reset to factory defaults
```

### "permission denied while trying to connect to the Docker daemon"

```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Fazer logout e login novamente
# Ou execute:
newgrp docker
```

### WSL 2 não instalado

```powershell
# Abrir PowerShell como Admin
wsl --install

# Reiniciar computador
shutdown /r /t 0
```

---

## Comandos básicos Docker

```bash
# Ver versão
docker --version

# Ver containers rodando
docker ps

# Ver todos os containers
docker ps -a

# Ver imagens
docker images

# Criar e rodar container
docker run -d -p 80:80 nginx

# Parar container
docker stop <container_id>

# Remover container
docker rm <container_id>

# Ver logs
docker logs <container_id>
```

---

## Links úteis

- Documentação oficial: https://docs.docker.com/
- Docker Hub: https://hub.docker.com/
- Estudos Docker: https://docker-curriculum.com/
