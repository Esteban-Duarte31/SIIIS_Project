import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navegate = useNavigate();

    const {registerUser} =useContext(UserContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('registrando...',email, password);
        try {
            await registerUser(email, password);
            console.log('registrado');
            navegate('/');
        } catch (error) {
            console.log(error.code);
        }
    }

    
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;