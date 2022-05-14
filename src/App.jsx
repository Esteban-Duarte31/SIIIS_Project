import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import NotFound from "./routes/NotFound";
import RequireAuth from "./components/RequireAuth";
import Review from "./routes/Review";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {

  const { user } = useContext(UserContext);

  if (user === false) {
    return <p> Cargando...</p>;
  }

  return (
    <>

      <Navbar />
      <h1>APP</h1>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/review" element={
          <RequireAuth>
            <Review />
          </RequireAuth>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  );
};

export default App
