// import dependencies
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const RequireAuthAdmin = ({ children }) => {
	const { getData, loading, data } = useFirestore();

	useEffect(() => {
		getData();
	}, []);

	// if (loading.getData ) {
	if (loading.getData || loading.getData === undefined) {
		return <div
			className="text-center text-gray-500 text-xl font-bold h-screen"
		>Cargando...</div>;
	} else {
		return data.map((item) => {
			return (
				<div key={item.userUID}>
					{item.role == "admin" ? children : <Navigate to="/" />};
				</div>
			);
		});
	}


};
export default RequireAuthAdmin;
