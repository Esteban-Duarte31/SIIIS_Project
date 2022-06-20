// import dependencies
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

// import routes
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Review from "./routes/Review";
import Profile from "./routes/Profile";
import Users from "./routes/Users";

// import components
import "flowbite";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import LayoutContainerForm from "./components/LayoutContainerForm";
import RequireAuthAdmin from "./components/RequireAuthAdmin";

// page index
const App = () => {
	const { user } = useContext(UserContext);

	if (user === false) {
		return <p> Cargando...</p>;
	}

	return (
		<>
			<Navbar />

			<Routes>
				<Route element={<LayoutContainerForm />}>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>

				<Route path="/" element={<Home />} />
				<Route
					path="/review"
					element={
						<RequireAuth>
							<Review />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path="/users"
					element={
						<RequireAuth>
							<RequireAuthAdmin>
								<Users />
							</RequireAuthAdmin>
						</RequireAuth>
					}
				/>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Footer />
		</>
	);
};

export default App;
