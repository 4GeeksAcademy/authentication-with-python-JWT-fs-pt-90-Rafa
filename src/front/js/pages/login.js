import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		await actions.login(email, password, navigate);
	}


	return (
		<div className="text-center mt-5" style={{ margin: "30%" }}>
			<div className="page-content page-container" id="page-content">
				<div className="card row col-md-12">
					<div className="card-header">
						<strong>Login to your account</strong>
					</div>
					<div className="card-body">
						<form onSubmit={handleLogin}>
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
									onChange={(p) => setPassword(p.target.value)}
									required />
							</div>
							<button
								type="submit"
								className="btn btn-primary w-100 py-2"
								onClick={handleLogin}>
								Login</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
