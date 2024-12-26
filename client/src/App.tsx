import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import HeroSection from './components/HeroSection'
import MainLayout from './layout/MainLayout'
import ForgotPassword from './auth/ForgotPassword'
import Login from './auth/login'
import Signup from './auth/Signup'
import ResetPassword from './auth/ResetPassword'
import { Search } from 'lucide-react'
import RestaurantDetail from './components/RestaurantDetail'


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated, user } = useUserStore();
  const isAuthenticated = true;
  const user = { isVerified: true };
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  if (!user?.isVerified) {
    return <Navigate to='/verify-email' replace />
  }
  return children;
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
    ]
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/search/:text',
    element: <Search />
  },
  {
    path: '/restaurant/:id',
    element: <RestaurantDetail />
  },

])

export default function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

