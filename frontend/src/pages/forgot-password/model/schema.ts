import { z } from 'zod'

export const emailSchema = z.object({
  email: z.email('Введите корректный email').min(1, 'Email обязателен'),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, 'OTP код обязателен')
    .length(6, 'OTP код должен содержать 6 цифр')
    .regex(/^\d+$/, 'OTP код должен содержать только цифры'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
    confirmPassword: z.string().min(1, 'Подтвердите пароль'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type EmailFormData = z.infer<typeof emailSchema>
export type OtpFormData = z.infer<typeof otpSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
