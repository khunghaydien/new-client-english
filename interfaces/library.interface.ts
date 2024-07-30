import { IPagination } from "./pagination.interface"

export interface IChapter {
    id: string
    name?: string
    type?: string[]
    banner?: string
    difficulty?: string
    createdAt?: string
    updatedAt?: string
    viewed?: number
    status?: string
    description?: string
    exercises?: IExercise[]
    explanations?: IExplanation[]
}

export interface IExercise {
    id: string
    name?: string
    construction?: string
    type?: string
    createdAt?: string
    updatedAt?: string
    questions?: IQuestion[]
    chapterId?: string
    chapter?: string
}

export interface IQuestion {
    id: string
    question?: string
    exerciseId?: string
    createdAt?: string
    updatedAt?: string
    exercise?: string
    answers?: IAnswer[]
}

export interface IAnswer {
    id: string
    label?: string
    value: string
    isCorrect?: boolean
    questionId?: string
    question?: IQuestion
}

export interface IExplanation {
    id: string
    name?: string
    createdAt?: string
    updatedAt?: string
    chapterId?: string
    chapter?: string
}

export interface ChapterState {
    chapters?: IChapter[],
    pagination?: IPagination
}

export interface ExerciseState {
    getExercises: {
        exercises: IExercise[]
        pagination: IPagination
    }
    exercise: IExercise
}