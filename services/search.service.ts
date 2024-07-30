
import { publicClient } from "./api.service"
export default {
    search() {
        const url = '/search'
        return publicClient.post(url)
    },
}