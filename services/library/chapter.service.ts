import ApiClientWithToken from "../api.service"
export default {
    getChapters() {
        const url = '/library/chapters'
        return ApiClientWithToken.get(url)
    },
}