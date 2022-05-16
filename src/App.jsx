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

// import components
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import LayoutContainerForm from "./components/LayoutContainerForm";

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
