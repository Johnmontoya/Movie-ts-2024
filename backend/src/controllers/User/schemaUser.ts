import * as yup from 'yup';

const createUser = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido'),
    email: yup
        .string()
        .email('Email invalido')
        .required('El email es requerido')
        .test(
            'validar email',
            'Ingrese una dirección de correo valida',
            value => {
                const result =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return result.test(String(value).toLocaleLowerCase());
            }
        ),
    password: yup
        .string()
        .min(8, 'el password debe contener al menos 8 carácteres')
        .oneOf(
            [yup.ref('confirmNewPassword')],
            'Las contraseñas no son las mismas'
        )
        .required('La contraseña es requerida'),
    confirmNewPassword: yup
        .string()
        .min(8, 'el confirmar password debe contener al menos 8 carácteres')
        .oneOf([yup.ref('password')], 'Las contraseñas no son las mismas')
});

const updateUser = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido'),
    email: yup
        .string()
        .email('Email invalido')
        .required('El email es requerido')
        .test(
            'validar email',
            'Ingrese una dirección de correo valida',
            value => {
                const result =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return result.test(String(value).toLocaleLowerCase());
            }
        )
});

const updatePassword = yup.object().shape({
    email: yup
        .string()
        .email('Email invalido')
        .required('El email es requerido')
        .test(
            'validar email',
            'Ingrese una dirección de correo valida',
            value => {
                const result =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return result.test(String(value).toLocaleLowerCase());
            }
        ),
    password: yup
        .string()
        .min(8, 'el password debe contener al menos 8 carácteres')
        .oneOf(
            [yup.ref('confirmNewPassword')],
            'Las contraseñas no son las mismas'
        )
        .required('La contraseña es requerida'),
    confirmNewPassword: yup
        .string()
        .min(8, 'el confirmar password debe contener al menos 8 carácteres')
        .oneOf([yup.ref('password')], 'Las contraseñas no son las mismas')
});

export default {createUser, updateUser, updatePassword};
