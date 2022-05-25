// import dependencies
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useFirestore } from "../hooks/useFirestore";

const RequireAuthAdmin = ({ children }) => {
	const { data, getData, loading } = useFirestore();

	useEffect(() => {
		console.log("Autenticando Role Admin...");
		getData();
	}, []);
	if (loading.getData) {
		return <div>Cargando...</div>;
	}
	const { user } = useContext(UserContext);
	const role = data.map((item) => item.role);
	if (!user && role[0] != "admin") {
		return <Navigate to="/" />;
	}

	return children;
};
export default RequireAuthAdmin;
