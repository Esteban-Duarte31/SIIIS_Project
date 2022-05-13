import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Navbar from "./components/Navbar";
import NotFound from "./routes/NotFound";
import RequireAuth from "./components/RequireAuth";
import Review from "./routes/Review";

const App = () => {
  return (
    <>
      
      <Navbar />
      <h1>APP</h1>

      <Routes>
        <Route path="/login" element={<Login />} />
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
