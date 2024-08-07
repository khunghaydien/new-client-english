import { User } from "@/gql/graphql"
import { create } from "zustand"

type ProfileState = {
    user: User
}

type ProfileAction = {
    setUser: (user: User) => void
}

export const useProfileStore = create<ProfileState & ProfileAction>()(
    (set) => ({
        user: {
            createdAt: undefined,
            email: "",
            id: "",
            name: "",
            password: "",
            updatedAt: undefined
        },
        setUser: (user: User) => set({ user })
    })
)