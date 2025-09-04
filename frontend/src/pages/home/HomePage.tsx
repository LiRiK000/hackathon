import { Button } from 'antd'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hackathon Project</h1>
        <p className={styles.subtitle}>
          Welcome to your new project with Feature-Sliced Design architecture.
          Built with React, TypeScript, and Ant Design.
        </p>
        <div className={styles.buttonGroup}>
          <Button type='primary' size='large'>
            Get Started
          </Button>
          <Button size='large'>Learn More</Button>
        </div>
      </div>
    </div>
  )
}
