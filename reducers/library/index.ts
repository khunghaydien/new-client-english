import {
    combineReducers,
} from '@reduxjs/toolkit'
import chapterReducer from './chapter.reducer'
import exerciseReducer from './exercise.reducer'

export const libraryReducer = combineReducers({
    chapter: chapterReducer,
    exercise: exerciseReducer
})

export type LibraryState = ReturnType<typeof libraryReducer>

