import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
                retryDelay: 0,
            },
        },
    })

export const renderWithQueryClient = (ui: React.ReactElement) => {
    const queryClient = createTestQueryClient()
    return {
        ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
        queryClient,
    }
}
