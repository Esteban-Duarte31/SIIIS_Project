// import dependencies
import { async } from "@firebase/util";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const RequireAuthAdmin = ({ children }) => {
	const { getData, loading, data } = useFirestore();

	useEffect(() => {
		console.log("Autenticando Role Admin...");

		getData();
	}, []);

	if (loading.getData) {
		return <div>Cargando...</div>;
	} else {
		return data.map((item) => {
			console.log(item.role);
			return (
				<div key={item.userUID}>
					{item.role == "admin" ? children : <Navigate to="/" />};
				</div>
			);
		});
	}


};
export default RequireAuthAdmin;
