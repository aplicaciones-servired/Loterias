# Base de Node.js versión 18
FROM node:18-slim

# Carpeta de la aplicación
WORKDIR /app

# Copiar package.json y package-lock.json primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
