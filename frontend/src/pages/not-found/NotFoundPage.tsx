import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          type='primary'
          size='large'
          className={styles.homeButton}
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  )
}
