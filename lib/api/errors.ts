export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public endpoint?: string
    ) {
        super(message)
        this.name = 'APIError'
    }
}

export function handleAPIError(error: unknown, endpoint: string): never {
    if (error instanceof Response) {
        throw new APIError(
            `API request failed: ${error.statusText}`,
            error.status,
            endpoint
        )
    }

    if (error instanceof Error) {
        throw new APIError(`Request error: ${error.message}`, undefined, endpoint)
    }

    throw new APIError('Unknown error occurred', undefined, endpoint)
}
