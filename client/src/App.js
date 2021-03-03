import { useState } from "react";
import axios from "axios";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
import Auth from "./components/Auth";
import { UIProvider } from "./context";
import jwt from "jwt-decode";
import store from "./redux/store";
import { useSelector } from "react-redux";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const token = localStorage.getItem("token");

if (token) {
	const decodedToken = jwt(token);
	const expiresAt = new Date(decodedToken.exp * 1000);

	if (new Date() > expiresAt) {
		localStorage.removeItem("token");
	} else {
		store.dispatch({ type: "SET_USER", payload: decodedToken });
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
} else {
	console.log("NO TOKEN");
}

function App({ darkModeDefault = true }) {
	const user = useSelector((state: any) => state.user.user);

	const [darkMode, setDarkMode] = useState(darkModeDefault);

	return (
		<UIProvider>
			<main
				data-testid="application"
				className={darkMode ? "darkmode" : undefined}
			>
				{user ? (
					<>
						<Header darkMode={darkMode} setDarkMode={setDarkMode} />

						<Content />

						<Footer />
					</>
				) : (
					<>
						<Header darkMode={darkMode} setDarkMode={setDarkMode} />
						<Auth />
					</>
				)}
			</main>
		</UIProvider>
	);
}

export default App;
