// import dependencies
import { useContext } from "react";
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
	const { required, patternEmail, patternPassword, validateEmptyField } =
		FormValidate();

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
		console.log("Iniciando sesión...");
		try {
			await loginUser(data.email, data.password);
			console.log("sesión iniciada");
			navegate("/");
			window.location.reload();
		} catch (error) {
			console.log(error.code);
			const { code, message } = ErrorsFirebase(error.code);
			setError(code, { message });
		}
	};

	// render login form
	return (
		<>
			<FormErrors error={errors.errorIntern} />

			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-12 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Inicia sesión
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<a
							href="#"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							start your 14-day free trial
						</a>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<FormInput
							type="email"
							placeholder=" "
							label="Ingrese su email"
							htmlFor="email-address"
							name="floating_email"
							error={errors.email}
							{...register("email", {
								required,
								pattern: patternEmail,
							})}
						>
							<FormErrors error={errors.email} />
						</FormInput>

						<FormInput
							type="password"
							placeholder=" "
							label="Ingrese su contraseña"
							htmlFor="password"
							name="floating_password"
							error={errors.password}
							{...register("password", {
								required,
								validate: validateEmptyField,
							})}
						>
							<FormErrors error={errors.password} />
						</FormInput>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900"
							>
								Recuerdame
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								{/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
							</span>
							Iniciar sesión
						</button>
					</div>
				</form>

				<div className="mt-12 pt-6 border-t"></div>
			</div>
		</>
	);
};
export default Login;
