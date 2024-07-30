import ApiClientWithToken from "../api.service"
export default {
    getExercises() {
        const url = '/library/exercises'
        return ApiClientWithToken.get(url)
    },
    getExercise() {
        const url = '/library/exercise'
        return ApiClientWithToken.get(url)
    },

}