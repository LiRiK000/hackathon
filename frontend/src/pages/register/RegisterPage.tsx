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
import { registerSchema } from './model/schema'
import styles from './RegisterPage.module.scss'

const { Title, Text } = Typography

export const RegisterPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { openNotification, contextHolder } = useNotificationApi()

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true)

    try {
      registerSchema.parse(values)

      await new Promise(resolve => {
        setTimeout(resolve, 1500)
      })

      openNotification('Аккаунт успешно создан!', NOTIFICATION_TYPES.SUCCESS)
      console.log('Register values:', values)

      setTimeout(() => navigate('/auth'), 1000)
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
            Создать аккаунт
          </Title>

          <Text className={styles.subtitle}>
            Заполните форму для создания нового аккаунта
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
            name='name'
            label='Имя'
            rules={[
              { required: true, message: 'Пожалуйста, введите имя' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа' },
            ]}
          >
            <Input
              prefix={<UserOutlined className={styles.inputIcon} />}
              placeholder='Введите ваше имя'
              className={styles.input}
            />
          </Form.Item>

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
              placeholder='Подтвердите пароль'
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
              {loading ? 'Создание аккаунта...' : 'Создать аккаунт'}
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text className={styles.footerText}>
            Уже есть аккаунт?{' '}
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
