import { MailOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons'
import { Step } from './types'
import styles from './ForgotPasswordPage.module.scss'

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
export const getStepClass = (stepNumber: number, currentStep: Step) => {
  switch (stepNumber) {
    case 1:
      switch (currentStep) {
        case Step.EMAIL:
          return styles.active
        case Step.OTP:
        case Step.RESET_PASSWORD:
          return styles.completed
        default:
          return ''
      }
    case 2:
      switch (currentStep) {
        case Step.OTP:
          return styles.active
        case Step.RESET_PASSWORD:
          return styles.completed
        default:
          return ''
      }
    case 3:
      return currentStep === Step.RESET_PASSWORD ? styles.active : ''
    default:
      return ''
  }
}

export const getTitle = (currentStep: Step) => {
  switch (currentStep) {
    case Step.EMAIL:
      return 'Восстановление пароля'
    case Step.OTP:
      return 'Введите код'
    case Step.RESET_PASSWORD:
    default:
      return 'Новый пароль'
  }
}

export const getSubtitle = (currentStep: Step, email: string) => {
  switch (currentStep) {
    case Step.EMAIL:
      return 'Введите email для получения кода восстановления'
    case Step.OTP:
      return `Мы отправили 6-значный код на ${email}`
    case Step.RESET_PASSWORD:
    default:
      return 'Создайте новый надежный пароль'
  }
}

export const getIcon = (currentStep: Step) => {
  switch (currentStep) {
    case Step.EMAIL:
      return <MailOutlined />
    case Step.OTP:
      return <SafetyOutlined />
    case Step.RESET_PASSWORD:
    default:
      return <LockOutlined />
  }
}
