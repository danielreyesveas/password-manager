import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.scss";
import { Provider } from "react-redux";
import { UIProvider } from "./context";
import store from "./redux/store";

const Root = () => (
	<Provider store={store}>
		<UIProvider>
			<App />
		</UIProvider>
	</Provider>
);

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
