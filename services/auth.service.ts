import { LoginDto, LoginResponse, RegisterDto } from "@/types/auth"
import { signInClient } from "./api.service"
export default {
    login(requestBody: LoginDto): Promise<LoginResponse> {
        const url = '/sign-in'
        return signInClient.post(url, { ...requestBody })
    },
    register(requestBody: RegisterDto): Promise<LoginResponse> {
        const url = '/sign-up'
        return signInClient.post(url, { ...requestBody })
    },
}