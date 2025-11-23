'use server'

import { API_CONFIG } from '@/lib/api/config'
import { fetcher } from '@/lib/api/fetcher'
import type { User } from '@/types/user'

export async function getUser(): Promise<User> {
    return fetcher<User>(API_CONFIG.ENDPOINTS.USER)
}
