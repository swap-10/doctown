import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as api from "../../utils/api";

const Signup = () => {
    const userAuth = useContext(AuthContext);
    const navigate = useNavigate();
    const  [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await api.signup(formData);
            localStorage.setItem("token", data.token);
            userAuth.setUser(data.token);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
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
                <button type="submit">Signup</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup