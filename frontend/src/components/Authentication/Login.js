import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>!
            </p>
        </div>
    );
};

export default Login;