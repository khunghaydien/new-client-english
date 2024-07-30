
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { LibraryState } from '.'
import exerciseService from '@/services/library/exercise.service'
import { ExerciseState } from '@/interfaces'

const initialState: ExerciseState = {
    getExercises: {
        exercises: [],
        pagination: {
            currentPage: 0,
            pageSize: 0,
            totalElement: 0,
            totalPages: 0
        }
    },
    exercise: {
        id: ''
    }
}
export const getExercises = createAsyncThunk(
    'exercises',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const res = await exerciseService.getExercises()
            return res
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)
export const getExercise = createAsyncThunk(
    'exercise',
    async (id: string, { rejectWithValue, dispatch }) => {
        try {
            const res = await exerciseService.getExercise()
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getExercises.pending, state => {
        }),
            builder.addCase(getExercises.fulfilled, (state, { payload }) => {
                const { exercises, pagination } = payload.data
                state.getExercises.exercises = exercises
                state.getExercises.pagination = pagination
            }),
            builder.addCase(getExercises.rejected, state => {
            })
        builder.addCase(getExercise.pending, state => {
        }),
            builder.addCase(getExercise.fulfilled, (state, { payload }) => {
                const { exercise } = payload.data
                state.exercise = exercise
            }),
            builder.addCase(getExercise.rejected, state => {
            })
    },
})

export const selectExercise = (state: LibraryState) => state['exercise']

export default exerciseSlice.reducer