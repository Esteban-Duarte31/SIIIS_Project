import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { FormValidate } from "../utils/FormValidate";

import FormErrors from "../components/FormErrors";
import FormInputProfile from "../components/FormInputProfile";
import { useEffect } from "react";

const Profile = () => {
	const navegate = useNavigate();

	// validate form with react-hook-form
	const { required } = FormValidate();

	// useForm hook
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useForm();

	const { data, loading, error, getData, addData } = useFirestore();

	useEffect(() => {
		console.log("getdata profile");
		getData();
	}, []);

	if (loading.getData) {
		return <div>Cargando...</div>;
	}

	// useState hook
	const onSubmit = async (data) => {
		console.log("actualizando perfil...");
		try {
			await addData(data);
		} catch (error) {
			console.log(error.code);
			const { code, message } = ErrorsFirebase(error.code);
			setError(code, { message });
		}
	};

	return (
		<>
			<FormErrors error={errors.errorIntern} />

			{data.map((item) => (
				<div
					key={item.userUID}
					className="p-6 m-12 max-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
				>
					
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-6 mb-6 lg:grid-cols-2">
							<FormInputProfile
								type="text"
								placeholder={item.name}
								label="Nombres"
								htmlFor="names"
								name="names"
								error={errors.names}
								{...register("names", {
									required,
								})}
							>
								<FormErrors error={errors.names} />
							</FormInputProfile>

							<FormInputProfile
								type="text"
								placeholder={item.lastName}
								label="Apellidos"
								htmlFor="lastNames"
								name="lastNames"
								error={errors.lastNames}
								{...register("lastNames", {
									required,
								})}
							>
								<FormErrors error={errors.names} />
							</FormInputProfile>

							<div className="flex flex-wrap">
								<div className="flex items-center mr-4">
									<input
										id="red-radio"
										type="radio"
										defaultValue=""
										name="colored-radio"
										className="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 focus:ring-pink-400 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="red-radio"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Femenino
									</label>
								</div>
								<div className="flex items-center mr-4">
									<input
										id="green-radio"
										type="radio"
										defaultValue=""
										name="colored-radio"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="green-radio"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										Masculino
									</label>
								</div>

								<div className="flex items-center mr-4">
									<input
										id="teal-radio"
										type="radio"
										defaultValue=""
										name="colored-radio"
										className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="teal-radio"
										className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
									>
										LGBTQ +
									</label>
								</div>
							</div>

							<FormInputProfile
								type="tel"
								placeholder={item.phone}
								label="Telefono"
								htmlFor="phone"
								name="phone"
								error={errors.phone}
								{...register("phone", {
									required,
								})}
							>
								<FormErrors error={errors.phone} />
							</FormInputProfile>
						</div>
						<div className="mb-6">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Correo
							</label>
							<input
								type="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder={item.email}
								required=""
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="•••••••••"
								required=""
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="confirm_password"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Confirmar contraseña
							</label>
							<input
								type="password"
								id="confirm_password"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="•••••••••"
								required=""
							/>
						</div>

						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Submit
						</button>
					</form>
				</div>
			))}
		</>
	);
};

export default Profile;
