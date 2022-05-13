import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {

    const { user, setUser } = useContext(UserContext)
    return (
        <div>
            {user ? (
                <nav className="navbar navbar-dark bg-dark">
                    <NavLink to="/" >Inicio</NavLink>
                    <NavLink to="/review" >Reseñas</NavLink>
                    <button onClick={() => setUser(false)}>Cerrar sesión</button>
                </nav>) : (
                <nav className="navbar navbar-dark bg-dark">
                    <NavLink to="/" >Inicio</NavLink>
                    <NavLink to="/review" >Reseñas</NavLink>
                    <NavLink to="/login" >Iniciar sesión</NavLink>
                </nav>)

            }
        </div>

    );
};
export default Navbar;