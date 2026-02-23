import * as yup from 'yup'

export const registerSchema = yup.object({
  login: yup
    .string()
    .required('Логин обязателен')
    .min(3, 'Логин должен содержать не менее 3 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Подтверждение пароля обязателено')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

export const loginSchema = yup.object({
  login: yup
    .string()
    .required('Логин обязателен')
    .min(3, 'Логин должен содержать не менее 3 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен содержать не менее 6 символов'),
})

export const articleSchema = yup.object({
  title: yup.string().required('Название обязателено'),
  content: yup.string().required('Содержимое обязателено'),
  imageUrl: yup
    .string()
    .url('Введите корректный URL')
    .required('URL изображения обязателен'),
})
