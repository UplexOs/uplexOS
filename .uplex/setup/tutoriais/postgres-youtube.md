# Tutorial — Instalar PostgreSQL

Guia completo para instalar o PostgreSQL.

> 💡 **Dica:** O UplexOS usa PostgreSQL via Docker por padrão. Se você tem Docker instalado, o banco é criado automaticamente. Este tutorial é para quem prefere instalar localmente.

---

## Windows

### Método 1: Installer Oficial (Recomendado)

1. Acesse: https://www.postgresql.org/download/windows/

2. Baixe a versão mais recente (15.x ou 16.x)

3. Execute o instalador

4. Siga o assistente:
   - Local de instalação (padrão: `C:\Program Files\PostgreSQL\16\`)
   - Componentes: selecione todos
   - Data directory: mantenha padrão
   - Senha do superusuário (postgres): **anote esta senha!**
   - Porta: 5432 (padrão)

5. Instale o Stack Builder (opcional)

6. Finalize

### Adicionar ao PATH

```powershell
# Abra "Editar variáveis de ambiente do sistema"
# Clique em "Variáveis de Ambiente"

# Em "Variáveis do Sistema", edite "Path" e adicione:
C:\Program Files\PostgreSQL\16\bin
C:\Program Files\PostgreSQL\16\lib
```

### Verificar instalação

```powershell
psql --version
```

### Conectar

```powershell
psql -U postgres -h localhost
# Digite a senha que definiu na instalação
```

---

## macOS

### Homebrew (Recomendado)

```bash
# Atualizar Homebrew
brew update

# Instalar PostgreSQL 15
brew install postgresql@15

# Iniciar serviço
brew services start postgresql@15

# Ou para iniciar manualmente:
/opt/homebrew/opt/postgresql@15/bin/postgres -D /opt/homebrew/var/postgresql@15
```

### Verificar

```bash
psql --version
/opt/homebrew/opt/postgresql@15/bin/psql --version
```

### Conectar

```bash
# Criar usuário (opcional)
createuser -s postgres

# Ou conectar direto:
psql -U postgres
```

### pgAdmin (GUI)

```bash
brew install --cask pgadmin4
```

---

## Linux (Ubuntu/Debian)

### Instalação

```bash
# Atualizar sistema
sudo apt update

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Verificar status
sudo systemctl status postgresql

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Configuração inicial

```bash
# Conectar como usuário postgres
sudo -u postgres psql

# Dentro do psql, definir senha:
ALTER USER postgres WITH PASSWORD 'sua_senha_segura';

# Sair
\q
```

### Permitir conexão local

```bash
# Editar pg_hba.conf
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Alterar para:
local   all             postgres                                trust
local   all             all                                     trust
host    all             all             127.0.0.1/32            md5

# Reiniciar
sudo systemctl restart postgresql
```

---

## Docker (Alternativa)

Se preferir usar Docker em vez de instalar localmente:

```bash
# Criar container PostgreSQL
docker run -d \
  --name meu-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=meu_banco \
  -p 5432:5432 \
  postgres:15-alpine

# Conectar
psql -h localhost -U postgres -p 5432
# Senha: postgres
```

---

## Comandos básicos PostgreSQL

```sql
-- Listar bancos
\l

-- Criar banco
CREATE DATABASE nome_do_banco;

-- Conectar ao banco
\c nome_do_banco

-- Listar tabelas
\dt

-- Listar usuários
\du

-- Criar tabela
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados
INSERT INTO usuarios (nome, email) VALUES ('João', 'joao@email.com');

-- Selecionar dados
SELECT * FROM usuarios;

-- Ver estrutura da tabela
\d usuarios
```

---

## pgAdmin (Interface Gráfica)

### O que é

Interface web para gerenciar PostgreSQL.

### Instalar (Windows)

1. Durante instalação do PostgreSQL, marque "pgAdmin"
2. Ou baixe单独 em: https://www.pgadmin.org/download/

### Instalar (Mac/Linux)

```bash
# Mac
brew install --cask pgadmin4

# Linux
sudo apt install -y pgadmin4
```

### Usar

1. Abra pgAdmin
2. Clique em "Add New Server"
3. Preencha:
   - Name: Meu Servidor
   - Host: localhost
   - Port: 5432
   - Database: postgres
   - Username: postgres
   - Password: sua_senha

---

## Resolver problemas

### "Connection refused"

```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Reiniciar
sudo systemctl restart postgresql
```

### "Password authentication failed"

```bash
# Resetar senha (Linux)
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'nova_senha';
\q

# Editar pg_hba.conf para permitir conexões
sudo nano /etc/postgresql/15/main/pg_hba.conf
# Mude "md5" para "trust" temporariamente
sudo systemctl restart postgresql
```

---

## Links úteis

- Site oficial: https://www.postgresql.org/
- Documentação: https://www.postgresql.org/docs/
- pgAdmin: https://www.pgadmin.org/
