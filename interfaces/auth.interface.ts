export interface SignInDto {
    email: string
    password: string
}

export interface SignInResponse {
    acccess_token: string
    refresh_token: string
}

export interface SignOutDto {
    userId: string
}

export interface SignUpDto extends SignInDto {
    name: string
}

export interface SignUpResponse extends SignInResponse { }

export interface User {
    id: string
    name: string
    email: string
    password: string
    image?: string
}

export interface AuthState {
    user: User | null
    signInLoading: boolean
    signUpLoading: boolean
}
