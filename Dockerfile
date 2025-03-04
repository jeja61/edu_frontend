# Базовый образ с Node.js (Alpine — лёгкий вариант)
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Копируем весь код
COPY . .

# Собираем Next.js проект
RUN npm run build

# --- Фаза запуска ---
FROM node:18-alpine AS runner
WORKDIR /app

# Копируем только билд и зависимости
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Открываем порт 3000 (по умолчанию Next.js)
EXPOSE 3000

# Запускаем Next.js
CMD ["npm", "run", "start"]
