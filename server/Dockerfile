# Base de Node.js versión 18
FROM node:slim

# Cambiar a la carpeta de la aplicación
WORKDIR /app

# Instalar dependencias
COPY . .

RUN npm install

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
