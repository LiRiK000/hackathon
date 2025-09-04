import { Button, Card, Form, Input, Typography } from 'antd'
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useNotificationApi, NOTIFICATION_TYPES } from '@shared/utils'
import {
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  EmailFormData,
  OtpFormData,
  ResetPasswordFormData,
} from './model/schema'
import styles from './ForgotPasswordPage.module.scss'
import { Step } from './types'
import {
  formatTime,
  getStepClass,
  getTitle,
  getSubtitle,
  getIcon,
} from './utils'

const { Title, Text } = Typography

export const ForgotPasswordPage = () => {
  const [emailForm] = Form.useForm<EmailFormData>()
  const [otpForm] = Form.useForm<OtpFormData>()
  const [resetPasswordForm] = Form.useForm<ResetPasswordFormData>()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>(Step.EMAIL)
  const [email, setEmail] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const { openNotification, contextHolder } = useNotificationApi()

  useEffect(() => {
    const emailFromAuth = location.state?.email
    if (emailFromAuth) {
      setEmail(emailFromAuth)
      emailForm.setFieldsValue({ email: emailFromAuth })
    }
  }, [location.state, emailForm])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleEmailSubmit = async (values: EmailFormData) => {
    setLoading(true)

    try {
      emailSchema.parse(values)

      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1500)
      })

      setEmail(values.email)
      setCurrentStep(Step.OTP)
      setResendTimer(60)

      openNotification(
        `Код восстановления отправлен на ${values.email}`,
        NOTIFICATION_TYPES.SUCCESS
      )
    } catch (error) {
      console.error('Email validation error:', error)
      openNotification(
        'Проверьте правильность введенного email',
        NOTIFICATION_TYPES.ERROR
      )
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (values: OtpFormData) => {
    setLoading(true)

    try {
      otpSchema.parse(values)

      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1500)
      })

      openNotification(
        'Код подтвержден! Создайте новый пароль',
        NOTIFICATION_TYPES.SUCCESS
      )

      setCurrentStep(Step.RESET_PASSWORD)
    } catch (error) {
      console.error('OTP validation error:', error)
      openNotification(
        'Неверный код. Проверьте введенные данные',
        NOTIFICATION_TYPES.ERROR
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (values: ResetPasswordFormData) => {
    setLoading(true)

    try {
      resetPasswordSchema.parse(values)

      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1500)
      })

      openNotification('Пароль успешно изменен!', NOTIFICATION_TYPES.SUCCESS)

      setTimeout(() => {
        navigate('/auth', {
          state: {
            message: 'Пароль успешно изменен. Войдите с новым паролем.',
          },
        })
      }, 2000)
    } catch (error) {
      console.error('Reset password error:', error)
      openNotification('Ошибка при смене пароля', NOTIFICATION_TYPES.ERROR)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0) return

    setLoading(true)

    try {
      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1000)
      })

      setResendTimer(60)
      openNotification(
        'Новый код отправлен на вашу почту',
        NOTIFICATION_TYPES.SUCCESS
      )
    } catch (error) {
      openNotification('Ошибка при отправке кода', NOTIFICATION_TYPES.ERROR)
    } finally {
      setLoading(false)
    }
  }

  const passwordVisibleIcon = (visible: boolean) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />

  const renderCurrentForm = () => {
    switch (currentStep) {
      case Step.EMAIL:
        return (
          <Form
            form={emailForm}
            onFinish={handleEmailSubmit}
            className={styles.form}
            layout='vertical'
            size='large'
            requiredMark={false}
          >
            <Form.Item
              name='email'
              label='Email'
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email' },
              ]}
            >
              <Input
                prefix={<MailOutlined className={styles.inputIcon} />}
                placeholder='example@email.com'
                className={styles.input}
                autoFocus
              />
            </Form.Item>

            <Form.Item className={styles.submitButton}>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className={styles.button}
                block
              >
                {loading ? 'Отправка кода...' : 'Отправить код'}
              </Button>
            </Form.Item>
          </Form>
        )
      case Step.OTP:
        return (
          <Form
            form={otpForm}
            onFinish={handleOtpSubmit}
            className={styles.form}
            layout='vertical'
            size='large'
            requiredMark={false}
          >
            <Form.Item
              name='otp'
              label='Код подтверждения'
              rules={[
                { required: true, message: 'Введите код подтверждения' },
                { len: 6, message: 'Код должен содержать 6 цифр' },
                {
                  pattern: /^\d+$/,
                  message: 'Код должен содержать только цифры',
                },
              ]}
            >
              <Input.OTP
                className={styles.otpInput}
                autoFocus
                style={{ justifyContent: 'space-between', width: '100%' }}
                onChange={input => {
                  const value = input.replace(/\D/g, '')
                  otpForm.setFieldsValue({ otp: value })
                }}
              />
            </Form.Item>

            <Form.Item className={styles.submitButton}>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className={styles.button}
                block
              >
                {loading ? 'Проверка кода...' : 'Подтвердить'}
              </Button>
            </Form.Item>

            <div style={{ textAlign: 'center' }}>
              <Text className={styles.footerText}>
                Не получили код?{' '}
                {resendTimer > 0 ? (
                  <span className={styles.timer}>
                    Повторить через {formatTime(resendTimer)}
                  </span>
                ) : (
                  <Button
                    type='link'
                    onClick={handleResendOtp}
                    className={styles.resendButton}
                    loading={loading}
                  >
                    Отправить снова
                  </Button>
                )}
              </Text>
            </div>
          </Form>
        )
      default:
        break
    }

    return (
      <Form
        form={resetPasswordForm}
        onFinish={handleResetPassword}
        className={styles.form}
        layout='vertical'
        size='large'
        requiredMark={false}
      >
        <Form.Item
          name='password'
          label='Новый пароль'
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль' },
            { min: 8, message: 'Пароль должен содержать минимум 8 символов' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.inputIcon} />}
            placeholder='Введите новый пароль'
            className={styles.input}
            iconRender={passwordVisibleIcon}
            autoFocus
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          label='Подтвердите пароль'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Подтвердите пароль' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={styles.inputIcon} />}
            placeholder='Подтвердите новый пароль'
            className={styles.input}
            iconRender={passwordVisibleIcon}
          />
        </Form.Item>

        <Form.Item className={styles.submitButton}>
          <Button
            type='primary'
            htmlType='submit'
            loading={loading}
            className={styles.button}
            block
          >
            {loading ? 'Изменение пароля...' : 'Изменить пароль'}
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.backgroundPattern} />

      <Card className={styles.authCard} variant='borderless'>
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${getStepClass(1, currentStep)}`} />
          <div className={`${styles.step} ${getStepClass(2, currentStep)}`} />
          <div className={`${styles.step} ${getStepClass(3, currentStep)}`} />
        </div>

        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>{getIcon(currentStep)}</div>
          </div>

          <Title level={2} className={styles.title}>
            {getTitle(currentStep)}
          </Title>

          <Text className={styles.subtitle}>
            {getSubtitle(currentStep, email)}
          </Text>
        </div>

        {renderCurrentForm()}

        <div className={styles.footer}>
          <Text className={styles.footerText}>
            Вспомнили пароль?{' '}
            <Button
              type='link'
              onClick={() => navigate('/auth')}
              className={styles.link}
            >
              Войти
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  )
}
