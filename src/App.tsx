import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, ErrorBoundary } from '@/components'
import { useAuthStore } from '@/features/auth'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GlobalMfaModal } from './pages/public/auth/GlobalMfaModal'
import Router from './routes/index.routes'

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

useAuthStore.getState().loadLocal();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          {import.meta.env.DEV === true && <ReactQueryDevtools />}
          <Router />
          <Toaster toastOptions={{ className: 'sonner-toast' }} />
          <GlobalMfaModal />
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
