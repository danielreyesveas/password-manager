import { useState } from "react";
import axios from "axios";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import { Provider } from "react-redux";
import store from "./redux/store";
import { UIProvider } from "./context";

function App({ darkModeDefault = true }) {
	const [darkMode, setDarkMode] = useState(darkModeDefault);

	axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL + "/api";

	return (
		<Provider store={store}>
			<UIProvider>
				<main
					data-testid="application"
					className={darkMode ? "darkmode" : undefined}
				>
					<Header darkMode={darkMode} setDarkMode={setDarkMode} />

					<Content />
				</main>
			</UIProvider>
		</Provider>
	);
}

export default App;
