FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia código fonte
COPY src ./src

# Copia migrations
COPY src/migrations ./src/migrations

# Build da aplicação
RUN npm run build

# Etapa 2: Produção
FROM node:18-alpine

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --omit=dev

# Copia build da etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/migrations ./src/migrations

# Copia script de entrada
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
ENTRYPOINT ["./docker-entrypoint.sh"]
