import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";


const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const navegate= useNavigate();
    const handleLogin = () => {
        setUser(true);
        navegate("/");
    };

    return (
        <>
            <h1>Login</h1>
            <h2>{user.name}
                {user ? 'en linea' : 'fuera de linea'}
            </h2>
            <button onClick={handleLogin}>Acceder</button>
        </>
    );
}
export default Login