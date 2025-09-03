FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json / yarn.lock
COPY package*.json ./
# o si usas yarn
# COPY package.json yarn.lock ./

# Instalar dependencias
RUN npm install
# o
# RUN yarn install

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build
# o
# RUN yarn run build

# Exponer puerto
EXPOSE 3000

# Iniciar aplicación
CMD ["node", "--env-file=.env", "dist/index.js"]
