

import { SignInDto, SignUpDto, } from "@/interfaces"
import ApiClientWithToken, { publicClient } from "./api.service"
export default {
    signIn(requestBody: SignInDto) {
        const url = '/auth/sign-in'
        return publicClient.post(url, { ...requestBody })
    },
    signUp(requestBody: SignUpDto) {
        const url = '/auth/sign-up'
        return publicClient.post(url, { ...requestBody })
    },
    signOut(id: string) {
        const url = '/auth/sign-out'
        return ApiClientWithToken.post(url, id)
    },
}