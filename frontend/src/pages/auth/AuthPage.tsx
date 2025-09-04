import { Button, Card, Form, Input, Typography } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  RocketOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotificationApi, NOTIFICATION_TYPES } from '@shared/utils'
import { z } from 'zod'
import { loginSchema } from './model/schema'
import styles from './AuthPage.module.scss'

const { Title, Text } = Typography

export const AuthPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { openNotification, contextHolder } = useNotificationApi()

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    setLoading(true)

    try {
      loginSchema.parse(values)

      await new Promise(resolve => {
        setTimeout(resolve, 1500)
      })

      openNotification('Успешный вход!', NOTIFICATION_TYPES.SUCCESS)
      console.log('Login values:', values)

      setTimeout(() => navigate('/'), 1000)
    } catch (error) {
      console.error('Validation error:', error)
      openNotification(
        'Проверьте правильность данных',
        NOTIFICATION_TYPES.ERROR
      )
    } finally {
      setLoading(false)
    }
  }
  const passwordVisibleIcon = (visible: boolean) =>
    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.backgroundPattern} />

      <Card className={styles.authCard} variant='borderless'>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <RocketOutlined />
            </div>
          </div>

          <Title level={2} className={styles.title}>
            Добро пожаловать!
          </Title>

          <Text className={styles.subtitle}>
            Войдите в свой аккаунт для продолжения
          </Text>
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
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
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder='example@email.com'
              className={styles.input}
            />
          </Form.Item>

          <Form.Item
            name='password'
            label='Пароль'
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль' },
              { min: 8, message: 'Пароль должен содержать минимум 8 символов' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.inputIcon} />}
              placeholder='Введите пароль'
              className={styles.input}
              iconRender={passwordVisibleIcon}
            />
          </Form.Item>

          <div className={styles.forgotPassword}>
            <Button
              type='link'
              className={styles.link}
              onClick={() => {
                const emailValue = form.getFieldValue('email')
                navigate('/forgot-password', {
                  state: { email: emailValue },
                })
              }}
            >
              Забыли пароль?
            </Button>
          </div>

          <Form.Item className={styles.submitButton}>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className={styles.button}
              block
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text className={styles.footerText}>
            Нет аккаунта?{' '}
            <Button
              type='link'
              onClick={() => navigate('/register')}
              className={styles.link}
            >
              Зарегистрироваться
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  )
}
