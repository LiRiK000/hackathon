import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Неверный формат email'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
})
