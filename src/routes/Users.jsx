import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";
import { getAuth, deleteUser } from "firebase/auth";
import { UserContext } from "../context/UserProvider";

const Users = () => {

	const {
		data,
		loading,
		error,
		getData,
		addData,
		getDataUsers,
		deleteData,
	} = useFirestore();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setError,
	} = useForm();

	useEffect(() => {
		console.log("getdataUsers");
		getDataUsers();
	}, []);


	if (loading.getDataUsers) {
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

	// delete user account whit data
	const handleClickDelete = async (id, userUID) => {
		console.log("eliminando usuario... id: ", id," - ", userUID);
		try {
			await deleteData(id);
		} catch (error) {
			console.log(error.code);
			const { code, message } = ErrorsFirebase(error.code);
			setError(code, { message });
		}
	};


	return data.map((item) => (
		<div key={item.userUID} className="flex font-sans w-2/6 p-6 mr-3">
			<div className="flex-none w-48 relative">
				<img
					src={item.profileImage}
					alt=""
					className="absolute inset-0 w-full h-full object-cover"
					loading="lazy"
				/>
			</div>
			<form className="flex-auto p-6">
				<div className="flex flex-wrap">
					<h1 className="flex-auto text-lg font-semibold text-slate-900">
						{item.name} {item.lastName}
					</h1>
					<div className="text-lg font-semibold text-slate-500">
						{item.role}
					</div>
					<div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
						{item.email}
					</div>
				</div>

				<div className="flex space-x-4 mb-6 text-sm font-medium">
					<div className="flex-auto flex space-x-4">
						<button
							className="h-10 px-6 font-semibold rounded-md bg-black text-white"
							type="button"
							onClick={() => handleClickDelete(item.id, item.userUID)}
						>
							Delete
						</button>
						<button
							className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
							type="button"
						>
							Add to bag
						</button>
					</div>
					<button
						className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
						type="button"
						aria-label="Like"
					>
						<svg
							width="20"
							height="20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							/>
						</svg>
					</button>
				</div>
				<p className="text-sm text-slate-700">
					Free shipping on all continental US orders.
				</p>
			</form>
		</div>
	));
};
export default Users;
