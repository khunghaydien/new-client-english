

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../stores'
import authService from '@/services/auth.service'
import { AuthState, SignInDto, SignOutDto, SignUpDto } from '@/interfaces'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/const'

const initialState: AuthState = {
    user: null,
    signInLoading: false,
    signUpLoading: false
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
    async (requestBody: SignOutDto, { rejectWithValue, dispatch }) => {
        try {
            const res = await authService.signOut(requestBody)
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
                const { access_token, refresh_token } = payload.data
                localStorage.setItem(ACCESS_TOKEN, access_token);
                localStorage.setItem(REFRESH_TOKEN, refresh_token);
            }),
            builder.addCase(signIn.rejected, state => {
            })
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            console.log(payload);
        })
    },
})

export const selectAuth = (state: RootState) => state['auth']

export default authSlice.reducer
