
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../stores'
import authService from '@/services/auth.service'
import { AuthState, SignInDto, SignUpDto } from '@/interfaces'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/const'

const initialState: AuthState = {
    user: {
        id: '',
        name: '',
        email: ''
    }
}
export const signIn = createAsyncThunk(
    'auth/sign-in',
    async (requestBody: SignInDto, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.signIn(requestBody)
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)
export const signUp = createAsyncThunk(
    'auth/sign-up',
    async (requestBody: SignUpDto, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.signUp(requestBody)
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)

export const signOut = createAsyncThunk(
    'auth/sign-out',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.signOut(id)
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.pending, state => {
        }),
            builder.addCase(signIn.fulfilled, (state, { payload }) => {
                const { user, tokens } = payload.data
                const { id, name, email } = user
                localStorage.setItem(ACCESS_TOKEN, tokens.access_token);
                localStorage.setItem(REFRESH_TOKEN, tokens.refresh_token);
                state.user = {
                    id,
                    name,
                    email
                }
            }),
            builder.addCase(signIn.rejected, state => {
            })
        builder.addCase(signOut.pending, state => {
        }),
            builder.addCase(signOut.fulfilled, (state, { payload }) => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                state.user = {
                    id: '',
                    name: '',
                    email: ''
                }
            }),
            builder.addCase(signOut.rejected, state => {
            })
        builder.addCase(signUp.pending, state => {
        }),
            builder.addCase(signUp.fulfilled, (state, { payload }) => {
            }),
            builder.addCase(signUp.rejected, state => {
            })
    },
})

export const selectAuth = (state: RootState) => state['auth']

export default authSlice.reducer
