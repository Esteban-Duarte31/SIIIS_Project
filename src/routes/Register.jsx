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
import { useFirestore } from "../hooks/useFirestore";

// page register
const Register = () => {
	const navegate = useNavigate();
	const { registerUser } = useContext(UserContext);
	const {addData } = useFirestore();
	// validate form with react-hook-form
	const {
		required,
		patternEmail,
		patternPassword,
		validateEmptyField,
		validateEqualsPasswords,
	} = FormValidate();

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
		try {
			await registerUser(data.email, data.password);
			await addData({
				name: "",
				lastName: "",
				phone: "",
				email: data.email,
				profileImage: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
			});
			navegate("/profile");
		} catch (error) {
			console.log(error.code);
			const { code, message } = ErrorsFirebase(error.code);
			setError(code, { message });
		}
	};

	// render register form
	return (
		<>
			<FormErrors error={errors.firebase} />

			<div className="max-w-md w-full space-y-8">
				<div>
					<img
						className="mx-auto h-28 w-auto"
						src="https://firebasestorage.googleapis.com/v0/b/siiis-a2398.appspot.com/o/image_resource%2Flogo_black.png?alt=media&token=865e49f6-bc1f-46ec-8e4e-923f503f0e96"
						alt="Workflow"
					/>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Registrate
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						O{" "}
						<a
							href="/Login"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Iniciar sesi??n
						</a>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						type="email"
						placeholder=" "
						label="Ingrese su email"
						htmlFor="email"
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
						label="Ingrese su contrase??a"
						htmlFor="password"
						error={errors.password}
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
						placeholder=" "
						label="Repita su contrase??a"
						htmlFor="password"
						error={errors.repassword}
						{...register("repassword", {
							validate: validateEqualsPasswords(getValues),
						})}
					>
						<FormErrors error={errors.repassword} />
					</FormInput>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								{/* <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" /> */}
							</span>
							Registrar
						</button>
					</div>
				</form>
				<div className="mt-12 pt-6 border-t"></div>
			</div>
		</>
	);
};

export default Register;
