import { Routes, Route } from 'react-router-dom'
import { NotFoundPage } from '@pages/not-found'
import { Suspense } from 'react'
import { Loader } from '@shared/ui/Loader'
import { AuthPage } from '@pages/auth'
import { HomePage } from '@pages/home'
import { RegisterPage } from '@pages/register'
import { ForgotPasswordPage } from '@pages/forgot-password'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path='/auth'
        element={
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        }
      />
      <Route
        path='/register'
        element={
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <Suspense fallback={<Loader />}>
            <ForgotPasswordPage />
          </Suspense>
        }
      />
      <Route
        path='*'
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  )
}
