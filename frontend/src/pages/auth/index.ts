import { lazy } from 'react'

export const AuthPage = lazy(() =>
  import('./AuthPage').then(module => ({ default: module.AuthPage }))
)
