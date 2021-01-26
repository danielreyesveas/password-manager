import { useState } from "react";
import axios from "axios";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import { Provider } from "react-redux";
import store from "./redux/store";

function App({ darkModeDefault = true }) {
	const [darkMode, setDarkMode] = useState(darkModeDefault);

	axios.defaults.baseURL = "http://localhost:5000/api";

	return (
		<Provider store={store}>
			<main
				data-testid="application"
				className={darkMode ? "darkmode" : undefined}
			>
				<Header darkMode={darkMode} setDarkMode={setDarkMode} />

				<Content />
			</main>
		</Provider>
	);
}

export default App;
