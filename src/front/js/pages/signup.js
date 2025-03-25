import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        await actions.signUp(email, password, navigate);
    };

    return (
        <div className="text-center mt-5" style={{ margin: "30%" }}>
            <div className="page-content page-container" id="page-content">
                <div className="card row col-md-12">
                    <div className="card-header">
                        <strong>Create an Account</strong>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="InputEmail">Email address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="InputEmail"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="InputPassword">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    id="InputPassword"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2">
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className="card-footer text-center  ">
                        <p>
                            Already have an account?
                            <button
                                className="btn btn-link"
                                onClick={() => navigate("/login")}>
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};