import { User } from "@/gql/graphql"
import { create } from "zustand"
import { persist, devtools } from "zustand/middleware"
type UserAction = {
    setUser: (user: User) => void
    logout: () => void
}
export const useUserStore = create<User & UserAction>()(
    devtools(
        persist(
            (set) => ({
                updatedAt: '',
                createdAt: '',
                password: '',
                id: "",
                fullname: "",
                email: "",
                bio: "",
                image: "",
                setUser: (user) => set(user),
                logout: () => {
                    set({
                        updatedAt: '',
                        createdAt: '',
                        password: '',
                        id: "",
                        fullname: "",
                        email: "",
                        bio: "",
                        image: "",
                    })
                },
            }),
            { name: 'user-storage' }
        )
    )
)