# Base de Node.js versión 18
FROM node:slim

# Cambiar a la carpeta de la aplicación
WORKDIR /app

# Instalar dependencias
COPY . .

RUN npm install

# Compilar TypeScript en tiempo de construcción
RUN ./node_modules/.bin/tsc

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación (ya compilado, no necesita tsc)
CMD ["node", "--env-file=.env", "./dist/index.js"]
