import { notification } from 'antd'

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export const useNotificationApi = () => {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (
    message: string,
    type: (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]
  ) => {
    api[type]({
      message,
    })
  }

  return { openNotification, contextHolder }
}
