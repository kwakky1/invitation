import * as yup from 'yup'

export const Validation = yup.object().shape({
    name: yup.string().required("이름을 입력해 주세요."),
    password: yup.string().required("비밀번호를 입력해 주세요."),
    text: yup.string().required("메세지를 입력해 주세요.")
})

export const PasswordValidation = yup.object().shape({
    password: yup.string().required("비밀번호를 입력해 주세요.")
})

export const UpdateValidation = yup.object().shape({
    name: yup.string().required("이름을 입력해 주세요."),
    password: yup.string().required("비밀번호를 입력해 주세요."),
    text: yup.string().required("메세지를 입력해 주세요.")
})