import { API_CONFIG } from './config'
import { handleAPIError } from './errors'

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`

        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        })

        if (!response.ok) {
            handleAPIError(response, endpoint)
        }

        const data = await response.json()
        return data as T
    } catch (error) {
        handleAPIError(error, endpoint)
    }
}
