# Etapa de build
FROM node:18 AS builder

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación con SSR
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nginx-custom.conf /etc/nginx/conf.d/default.conf

# Instalar solo dependencias de producción
RUN npm ci --omit=dev

# Exponer puertos
EXPOSE 80
EXPOSE 4000

# Iniciar el servidor SSR
CMD ["npm", "run", "serve:ssr"]