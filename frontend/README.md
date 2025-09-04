# Frontend

React приложение с TypeScript, построенное по архитектуре Feature-Sliced Design.

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открыть в браузере
# http://localhost:3000
```

## 🔧 Основные технологии

- **React 18** + **TypeScript**
- **Vite** - быстрый сборщик
- **Ant Design** - Enterprise UI components
- **SCSS + CSS Modules** - Scoped styling
- **React Router** - клиентский роутинг
- **React Query** - управление серверным состоянием
- **Zustand** - управление клиентским состоянием
- **Axios** - HTTP клиент

## 🛠 Скрипты

```bash
npm run dev          # Запуск dev сервера (http://localhost:3000)
npm run build        # Сборка для продакшена
npm run preview      # Превью продакшен сборки
npm run lint         # Проверка ESLint
npm run lint:fix     # Исправление ошибок ESLint
npm run format       # Форматирование Prettier
npm run format:check # Проверка форматирования
npm run type-check   # Проверка TypeScript
npm run commit       # Создание коммита через Commitizen
```

## 📝 Соглашения

### Импорты

```typescript
// Абсолютные импорты через алиасы
import { Button } from '@shared/ui'
import { LoginForm } from '@features/auth'
import { UserProfile } from '@entities/user'
```

### Компоненты

```typescript
// PascalCase для компонентов
export const UserProfile = () => {
  return <div>...</div>
}

// Экспорт через index.ts
// pages/home/index.ts
export { HomePage } from './HomePage'
```

### Стили

```typescript
// CSS Modules с SCSS
import styles from './Component.module.scss'

<div className={styles.container}>
  <button className={styles.primaryButton}>
    Click me
  </button>
</div>

// Ant Design компоненты
import { Button } from 'antd'
<Button type="primary">Click me</Button>
```

## 🔌 API интеграция

```typescript
// shared/api/api.ts
import { api } from '@shared/api'

// Автоматически добавляет токен и обрабатывает ошибки
const response = await api.get('/users')
```

## 🧪 Переменные окружения

```bash
# frontend/.env
VITE_API_URL=http://localhost:4000
VITE_APP_ENV=development
VITE_ENABLE_DEVTOOLS=true
```

## 🐳 Docker

```bash
# Разработка
docker build -f Dockerfile -t hackathon-frontend:dev .
docker run -p 3000:3000 hackathon-frontend:dev

# Продакшен
docker build -f Dockerfile.prod -t hackathon-frontend:prod .
docker run -p 80:80 hackathon-frontend:prod
```
