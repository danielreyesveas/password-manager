import { useState } from "react";
import { FaRegMoon, FaSun, FaKey } from "react-icons/fa";
import AddPassword from "../AddPassword";

export default function Header({ darkMode, setDarkMode }) {
	const [shouldShowMain, setShouldShowMain] = useState(false);
	const [showQuickAddTask, setShowQuickAddTask] = useState(false);

	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<FaKey />
				</div>
				<div className="settings">
					<ul>
						<li className="settings__add">
							<button
								data-testid="quick-add-task-action"
								aria-label="Quick add task"
								onClick={() => {
									setShowQuickAddTask(true);
									setShouldShowMain(true);
								}}
								onKeyDown={() => {
									setShowQuickAddTask(true);
									setShouldShowMain(true);
								}}
								type="button"
							>
								+
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

			<AddPassword
				showAddTaskMain={false}
				shouldShowMain={shouldShowMain}
				showQuickAddTask={showQuickAddTask}
				setShowQuickAddTask={setShowQuickAddTask}
			/>
		</header>
	);
}
