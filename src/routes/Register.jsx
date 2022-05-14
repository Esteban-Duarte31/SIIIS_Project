import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const { registerUser } = useContext(UserContext);
    const navegate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async (data) => {
        console.log('registrando...');
        try {
            await registerUser(data.email, data.password);
            console.log('registrado');
            navegate('/');
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('email',
                        {
                            type: 'manual',
                            message: 'El email ya está en uso'
                        });
                    break;
                case 'auth/invalid-email':
                    setError('email', {
                        type: 'manual',
                        message: 'El email no es válido'
                    }
                    );
                    break;
                case 'auth/weak-password':  // password debe tener al menos 6 caracteres
                    setError('password', {   // y no debe ser igual al email
                        type: 'manual',
                        message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                    );
                    break;
                case 'auth/wrong-password':
                    setError('password', {
                        type: 'manual',
                        message: 'La contraseña no es válida'
                    }
                    );
                    break;
                case 'auth/network-request-failed':
                    setError('password', {
                        type: 'manual',
                        message: 'Error de red'
                    }
                    );
                    break;
                 

                default:
                    alert('Error al registrar, intente nuevamente');
                    break;
            }
        }
    };


    return (
        <>
            <h1>Register</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "El email es requerido"
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "El email no es válido"
                        },
                        setValues: value => value.trim(),
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}


                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida"
                        },
                        minLength: {
                            value: 6,
                            message: "Mínimo 6 caracteres"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: "La contraseña debe tener al menos una letra y un número"
                        },
                        setValues: value => value.trim(),
                        validate: {
                            trim: value => {
                                if (!value.trim()) {
                                    return "El campo no puede estar vacío";
                                } else {
                                    return true;
                                }
                            }
                        }
                    })}
                />
                {errors.password && <p> {errors.password.message}</p>}


                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("repassword", {
                        validate: {
                            equals: value =>
                                value === getValues("password") || "Las contraseñas no coinciden"

                        }


                    })}
                />
                {errors.repassword && <p>{errors.repassword.message}</p>}


                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;