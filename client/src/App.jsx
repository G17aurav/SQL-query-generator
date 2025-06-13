import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./screens/Register";
import Login from "./screens/Login";

function App() {
  return(
    <div><ToastContainer
    position="top-left"
    autoClose={1500}
    style={{backgroundColor: "#000"}}
    hideProgressBar={true}
    newestOnTop={true}
    aria-label="notification"
  />
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  </div>
  );
}

export default App;
