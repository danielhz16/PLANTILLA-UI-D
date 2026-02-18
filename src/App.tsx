import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './routes/index.routes.tsx'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './common/context/ThemeContext'
import { Toaster } from 'sonner'
import { useAuthStore } from '@/common/stores/auth-store'
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
})

function App() {
  useEffect(() => {
    useAuthStore.getState().loadLocal();
  }, [])
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ className: 'sonner-toast' }} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
