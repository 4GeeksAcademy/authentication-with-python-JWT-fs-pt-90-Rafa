import { SignUp } from "../pages/signup";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: localStorage.getItem("token") || "",
			userData: [],
		},
		actions: {

			login: async (email, password, navigate) => {
				try {
					const options = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: email,
							password: password,
						})
					};
					const response = await fetch("https://solid-fishstick-pjppj5945q9qc64w9-3001.app.github.dev/api/sign_in", options)
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(errorData.message || "Login error");
					}
					const data = await response.json();

					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });

					navigate("/profile");

				} catch (error) {
					console.error("Fetch error:", error);
					alert(error.message || "Server error");
				}
			},

			signUp: async (email, password, navigate) => {
				try {
					const options = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					}
					const registerResponse = await fetch("https://solid-fishstick-pjppj5945q9qc64w9-3001.app.github.dev/api/sign_up", options)

					const data = await registerResponse.json();
					if (registerResponse.ok) {
						alert("User registered successfully");
						navigate("/login");
					} else {
						alert(data.msg || "Error registering user");
					}
				} catch (error) {
					console.error("Error registering:", error);
					alert(error.message || "Server error");
				}
			},

			getProfile: async (navigate) => {
				const store = getStore();
				const actions = getActions();
				try {
					const response = await fetch("https://solid-fishstick-pjppj5945q9qc64w9-3001.app.github.dev/api/profile", {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${store.token}`,
						},
					});

					if (!response.ok) {
						throw new Error("Failed to fetch profile");
					}

					const data = await response.json();
					setStore({ userData: data });
				} catch (error) {
					console.error("Error fetching profile:", error);
					actions.logout();
					navigate("/login");
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			},
		}
	};
};

export default getState;
