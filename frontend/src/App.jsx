import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Notes from "./pages/Notes.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/notes" /> : <Navigate to="/login" />}
        /> {/* token? YES (redirect to '/notes) : NO (redirect to '/login) */}

        <Route
          path="/login"
          element={token ? <Navigate to="/notes" /> : <Login />}
        /> {/* token? YES (redirect to '/notes) : NO (load Login logic/component) */}

        <Route
          path="/register"
          element={token ? <Navigate to="/notes" /> : <Register />}
        /> {/* token? YES (redirect to '/notes) : NO (load Register logic/component) */}

        <Route
          path="/notes"
          element={token ? <Notes /> : <Navigate to="/login" />}
        /> {/* token? YES (load Notes logic/component) : NO (redirect to '/login) */}
      </Routes>
    </>
  );
};

export default App;
