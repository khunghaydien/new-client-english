import * as yup from 'yup'

export const createChapterValidate = yup.object({
    name: yup.string().nullable().required('Name is requied'),
    type: yup.object().shape({
        value: yup.string().nullable().required("Type is required")
    }),
    difficulty: yup.object().shape({
        value: yup.string().nullable().required("Difficulty is requried")
    })
})
