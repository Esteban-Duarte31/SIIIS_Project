// import dependencies
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";

// import components
import FormErrors from "../components/FormErrors";
import FormInput from "../components/FormInput";

// page register
const Register = () => {

    const navegate = useNavigate();
    const { registerUser } = useContext(UserContext);

    // validate form with react-hook-form
    const {
        required,
        patternEmail,
        patternPassword,
        validateEmptyField,
        validateEqualsPasswords,
    } = FormValidate()

    // useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    // useState hook
    const onSubmit = async (data) => {
        console.log('registrando...');
        try {
            await registerUser(data.email, data.password);
            console.log('registrado');
            navegate('/');
        } catch (error) {
            setError("firebase",
                {
                    type: "manual",
                    message: ErrorsFirebase(error.code),
                });
        }
    };

// render register form
    return (
        <>
            <h1>Register</h1>
            <FormErrors error={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormInput
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormErrors error={errors.email} />

                </FormInput>


                <FormInput
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required,
                        pattern: patternPassword,
                        validate: validateEmptyField,
                    })}
                >
                    <FormErrors error={errors.password} />

                </FormInput>


                <FormInput
                    type="password"
                    placeholder="Contraseña"
                    {...register("repassword", {
                        validate: validateEqualsPasswords(getValues),
                    })}
                >
                    <FormErrors error={errors.repassword} />

                </FormInput>


                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;