import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [title, setTitle] = useState("");
	const [password, setPassword] = useState("");
	const [passwords, setPasswords] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post("http://localhost:5000/add-password", { title, password })
			.then((response) => console.log(response));
	};

	useEffect(() => {
		axios.get("http://localhost:5000/passwords").then((response) => {
			setPasswords(response.data);
		});
	}, []);

	const decriptPassword = (encryption) => {
		const { id, iv, password } = encryption;
		axios
			.post("http://localhost:5000/decrypt", { iv, password })
			.then((response) => {
				console.log(response);
				setPasswords(
					passwords.map((val) => {
						return val.id === id
							? { ...val, title: response.data.decrypted }
							: val;
					})
				);
			});
	};

	return (
		<div className="App">
			<div className="AddingPassword">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Name"
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>

					<button type="submit">Add Password</button>
				</form>
			</div>

			<div className="passwords">
				{passwords.map((pass, key) => {
					return (
						<div
							key={key}
							className="password"
							onClick={() => decriptPassword(pass)}
						>
							<h3>{pass.title}</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
