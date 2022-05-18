import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFirestore } from "../hooks/useFirestore";
import { ErrorsFirebase } from "../utils/ErrorsFirebase";

const Users = () => {
	const { data, loading, error, getData, addData, getDataUsers, deleteData } =
		useFirestore();

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

    const handleClickDelete = async (id) => {
        console.log("eliminando usuario... id: ", id);
        try {
            await deleteData(id);
        } catch (error) {
            console.log(error.code);
            const { code, message } = ErrorsFirebase(error.code);
            setError(code, { message });
        }
    };


	return data.map((item) => (
			<div key={item.userUID}>
				<p>{item.name}</p>
				<p>{item.lastName}</p>
				<p>{item.email}</p>
				<p>{item.role}</p>
				<p>{item.phone}</p>
				<p>{item.profileImage}</p>
				<button type="button" onClick={()=>handleClickDelete(item.id)} className="bg-red-500 shadow-lg shadow-red-500/50 ...">
					delete
				</button>
			</div>
	));
};
export default Users;
