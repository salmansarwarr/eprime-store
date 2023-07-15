import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./create.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../Redux/Actions/admin";

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(auth(password, navigate));
    };

    return (
        <div className="admin-page pt-48">
            <h1 className="text-white">Log in as admin</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="password" className="text-white">Password:</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default AdminPage;
