FROM node:18

WORKDIR /app

COPY tsconfig.json .
COPY .sequelizerc .
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN npx sequelize db:migrate

EXPOSE 3300

CMD ["npm", "run dev"]
