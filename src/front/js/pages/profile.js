import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        actions.getProfile(navigate)
    }, []);

    const handleLogout = () => {
        actions.logout();
        navigate("/login");
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-3 shadow-sm" style={{ width: "500px" }}>
                <h2 className="text-center mb-4">My Profile</h2>
                <p><strong>Email:</strong> {store.userData.email}</p>
                <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};
