import * as yup from 'yup'

export const createChapterValidate = yup.object({
    name: yup.string().nullable().required('Email is requied'),
    description: yup.string().nullable().min(8).required('Password is requied'),
    type: yup.string().nullable().min(8).required('Password is requied'),
    difficulty: yup.string().nullable().min(8).required('Password is requied')
})
