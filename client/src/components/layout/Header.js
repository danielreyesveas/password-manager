import { FaRegMoon, FaSun, FaKey, FaPlus } from "react-icons/fa";
import AddPassword from "../AddPassword";
import EditPassword from "../EditPassword";
import { useUI } from "../../context";
import Generator from "../Generator";

export default function Header({ darkMode, setDarkMode }) {
	const {
		showSidebar,
		setShowSidebar,
		setShowAddPassword,
		setShowGenerator,
	} = useUI();

	return (
		<header className="header" data-testid="header">
			<nav>
				{/* <div className="logo" onClick={() => setShowGenerator(true)}>
					<FaKey />
				</div> */}
				<div
					className={showSidebar ? "nav-toggle active" : "nav-toggle"}
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<i></i>
				</div>

				<div className="settings">
					<ul>
						<li className="settings__add">
							<button
								data-testid="quick-add-password-action"
								aria-label="Quick add task"
								onClick={() => {
									setShowAddPassword(true);
								}}
								onKeyDown={() => {
									setShowAddPassword(true);
								}}
								type="button"
							>
								<FaPlus />
							</button>
						</li>
						<li className="settings__darkmode">
							<button
								data-testid="dark-mode-action"
								aria-label="Darkmode on/off"
								onClick={() => setDarkMode(!darkMode)}
								onKeyDown={() => setDarkMode(!darkMode)}
								type="button"
							>
								{darkMode ? <FaSun /> : <FaRegMoon />}
							</button>
						</li>
					</ul>
				</div>
			</nav>

			<Generator />

			<AddPassword />

			<EditPassword />
		</header>
	);
}
