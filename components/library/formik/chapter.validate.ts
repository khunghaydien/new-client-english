import * as yup from 'yup'

export const createChapterValidate = yup.object({
    name: yup.string().nullable().required('Email is requied'),
    description: yup.string().nullable().min(8).required('Password is requied'),
    type: yup.object().shape({
        value: yup.string().nullable().required("Type is required")
    }),
    difficulty: yup.object().shape({
        value: yup.string().nullable().required("Difficulty is requried")
    })
})
