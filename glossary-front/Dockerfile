# Используем официальный образ Node.js для сборки React-приложения
FROM node:18 as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем остальные файлы
COPY . .

# Устанавливаем зависимости
RUN npm install

# Сборка React-приложения
RUN npm run build

# Используем Nginx для сервинга React-приложения
FROM nginx:alpine

# Копируем собранное приложение в директорию, обслуживаемую Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80 для сервера
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
