// import dependencies
import { useContext} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";

// import components
import FormErrors from "../components/FormErrors";
import FormInput from "../components/FormInput";

// page Login
const Login = () => {


    const { loginUser } = useContext(UserContext);
    const navegate = useNavigate();
    
    // validate form with react-hook-form
    const {
        required,
        patternEmail,
        patternPassword,
        validateEmptyField,
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
        console.log('Iniciando sesión...');
        try {
            await loginUser(data.email, data.password);
            console.log('sesión iniciada');
            navegate('/');
        } catch (error) {
            console.log(error.code);
            setError("firebase",
                {
                    type: "manual",
                    message: ErrorsFirebase(error.code),
                });
        }
    };

    // render login form
    return (
        <>
            <h1>Login</h1>
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
                        validate: validateEmptyField,
                    })}
                >
                    <FormErrors error={errors.password} />

                </FormInput>
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    );
}
export default Login