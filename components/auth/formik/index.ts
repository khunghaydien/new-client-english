import * as yup from 'yup'
const authValidate = () => {
    const loginValidate = yup.object({
        email: yup.string().nullable().required('Email is requied'),
        password: yup.string().nullable().min(8).required('Password is requied'),
    })
    const registerValidate = yup.object({
        email: yup.string().nullable().required('Email is required'),
        fullname: yup.string().nullable().required("Fullname is required"),
        password: yup.string().nullable().min(8).required("Password is required"),
        confirmPassword: yup.string().nullable().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    })
    return {
        loginValidate,
        registerValidate
    }
}
export default authValidate