export type LoginDto = {
    email: string
    password: string
}
export type LoginResponse = {
    acccess_token: string
    refresh_token: string
}