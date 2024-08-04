import { User } from "@/gql/graphql"
import { create } from "zustand"
type UserAction = {
    setUser: (user: User) => void
    logout: () => void
}
export const useUserStore = create<User & UserAction>()(
    (set) => ({
        updatedAt: '',
        createdAt: '',
        password: '',
        id: "",
        name: "",
        email: "",
        bio: "",
        avatar: "",
        setUser: (user) => set(user),
        logout: () => {
            set({
                updatedAt: '',
                createdAt: '',
                password: '',
                id: "",
                name: "",
                email: "",
                bio: "",
                avatar: "",
            })
        },
    }),
)