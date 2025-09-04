import { lazy } from 'react'

export const NotFoundPage = lazy(() =>
  import('./NotFoundPage').then(module => ({ default: module.NotFoundPage }))
)
