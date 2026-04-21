import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import router from './routes/index.routes.tsx'
import { RouterProvider } from 'react-router'
import { ThemeProvider, useAuthStore } from '@/common'
import { Toaster } from 'sonner'
import { useEffect } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


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
  }, []);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV === true && <ReactQueryDevtools />}
        <Toaster toastOptions={{ className: 'sonner-toast' }} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
