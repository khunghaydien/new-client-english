
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import searchService from '@/services/search.service'
import { SearchState } from '@/interfaces'
import { RootState } from '@/stores'

const initialState: SearchState = {
    data: []
}
export const getSearch = createAsyncThunk(
    'search',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await searchService.search()
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSearch.pending, state => {
        }),
            builder.addCase(getSearch.fulfilled, (state, { payload }) => {
                state.data = payload.data
            }),
            builder.addCase(getSearch.rejected, state => {
            })
    },
})

export const selectSearch = (state: RootState) => state['search']

export default searchSlice.reducer
