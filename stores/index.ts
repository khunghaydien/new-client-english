import {
    combineReducers,
    configureStore,
    ThunkAction,
    Action,
} from '@reduxjs/toolkit'
import authReducer from '@/reducers/auth.reduce'
import searchReducer from '@/reducers/search.reducer'
import { libraryReducer } from '@/reducers/library'

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    library: libraryReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
