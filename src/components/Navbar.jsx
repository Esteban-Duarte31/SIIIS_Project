import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {

    const { user, logoutUser } = useContext(UserContext)
    
    // method to logout user
    const handleLogout = async() => {
        try {
            await logoutUser();
        } catch (error) {
            console.log(error.code);
        }
    }
    
    return (
        <div>
            {user ? (
                <nav className="navbar navbar-dark bg-dark">
                    <NavLink to="/" >Inicio</NavLink>
                    <NavLink to="/review" >Reseñas</NavLink>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </nav>) : (
                <nav className="navbar navbar-dark bg-dark">
                    <NavLink to="/" >Inicio</NavLink>
                    <NavLink to="/review" >Reseñas</NavLink>
                    <>
                        <NavLink to="/register" >Registrar</NavLink>
                        <NavLink to="/login" >Iniciar sesión</NavLink>
                    </>
                </nav>)

            }
        </div>

    );
};
export default Navbar;