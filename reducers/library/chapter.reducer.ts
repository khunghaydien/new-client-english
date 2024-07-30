
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chapterService from '@/services/library/chapter.service'
import { ChapterState } from '@/interfaces/library.interface'
import { LibraryState } from '.'

const initialState: ChapterState = {}
export const getChapters = createAsyncThunk(
    'library/chapters',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await chapterService.getChapters()
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)
export const chapterSlice = createSlice({
    name: 'chapter',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getChapters.pending, state => {
        }),
            builder.addCase(getChapters.fulfilled, (state, { payload }) => {
                const { chapters, pagination } = payload.data
                state.chapters = chapters
                state.pagination = pagination
            }),
            builder.addCase(getChapters.rejected, state => {
            })
    },
})

export const selectChapter = (state: LibraryState) => state['chapter']

export default chapterSlice.reducer
