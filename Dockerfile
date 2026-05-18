FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the React/Vite code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]