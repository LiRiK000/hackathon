import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hackathon Project</h1>
        <p className={styles.subtitle}>
          Welcome to your new project with Feature-Sliced Design architecture.
          Built with React, TypeScript, and Ant Design.
        </p>
        <div className={styles.buttonGroup}>
          <Button type='primary' size='large' onClick={() => navigate('/auth')}>
            Войти
          </Button>
          <Button size='large' onClick={() => navigate('/register')}>
            Регистрация
          </Button>
        </div>
      </div>
    </div>
  )
}
