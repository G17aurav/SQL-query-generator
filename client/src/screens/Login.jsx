import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../utils/config";   

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handlelogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast("Please fill in all fields");
            return;
        }
        try {
            const response = await axios.post(`${config.API_URL}auth/login`, {
                email,
                password,
            });
            if (response.data.success) {
                toast.success("Login successful");
                setEmail("");
                setPassword("");
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <div>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlelogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;