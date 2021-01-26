import { useState } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { addPassword } from "../redux/actions/dataActions";
import GroupOverlay from "./GroupOverlay";

const AddPassword = ({
	showAddTaskMain = true,
	shouldShowMain = false,
	showQuickAddTask,
	setShowQuickAddTask,
	selectedGroup,
	addPassword,
}) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [group, setGroup] = useState(null);
	const [showMain, setShowMain] = useState(shouldShowMain);
	const [showGroupOverlay, setShowGroupOverlay] = useState(false);

	const handleAddPassword = () => {
		if (name === "" || password === "") return;

		const pass = {
			name,
			password,
		};

		if (group) pass.groupId = group;
		else if (selectedGroup) pass.groupId = selectedGroup;

		addPassword(pass);

		setName("");
		setPassword("");
		setGroup("");
		setShowMain(false);
		setShowGroupOverlay(false);
	};

	return (
		<div
			className={
				showQuickAddTask ? "add-task add-task__overlay" : "add-task"
			}
			data-testid="add-task-comp"
		>
			{showAddTaskMain && (
				<div
					aria-label="Add task"
					className="add-task__shallow"
					data-testid="show-main-action"
					onClick={() => {
						setShowMain(!showMain);
					}}
					onKeyDown={() => {
						setShowMain(!showMain);
					}}
					tabIndex={0}
					role="button"
				>
					<span className="add-task__plus">+</span>
					<span className="add-task__text">Add Password</span>
				</div>
			)}

			{(showMain || showQuickAddTask) && (
				<div className="add-task__main" data-testid="add-task-main">
					{showQuickAddTask && (
						<>
							<div data-testid="quick-add-task">
								<h2 className="header">Quick Add Password</h2>
								<span
									aria-label="Cancel adding task"
									className="add-task__cancel-x"
									data-testid="add-task-quick-cancel"
									onClick={() => {
										setShowMain(false);
										setShowGroupOverlay(false);
										setShowQuickAddTask(false);
									}}
									onKeyDown={() => {
										setShowMain(false);
										setShowGroupOverlay(false);
										setShowQuickAddTask(false);
									}}
									tabIndex={0}
									role="button"
								>
									X
								</span>
							</div>
						</>
					)}

					<GroupOverlay
						setGroup={setGroup}
						showGroupOverlay={showGroupOverlay}
						setShowGroupOverlay={setShowGroupOverlay}
					/>

					<input
						aria-label="Enter the name"
						className="add-task__content"
						data-testid="add-task-content"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						aria-label="Enter your password"
						className="add-task__content"
						data-testid="add-task-content"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<button
						className="add-task__submit"
						data-testid="add-task"
						type="button"
						onClick={() => {
							showQuickAddTask
								? handleAddPassword() &&
								  setShowQuickAddTask(false)
								: handleAddPassword();
						}}
					>
						Add Password
					</button>

					{!showQuickAddTask && (
						<span
							aria-label="Cancel adding a task"
							className="add-task__cancel"
							data-testid="add-task-main-cancel"
							onClick={() => {
								setShowMain(false);
								setShowGroupOverlay(false);
							}}
							onKeyDown={() => {
								setShowMain(false);
								setShowGroupOverlay(false);
							}}
							tabIndex={0}
							role="button"
						>
							Cancel
						</span>
					)}

					<span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => setShowGroupOverlay(!showGroupOverlay)}
						onKeyDown={() => setShowGroupOverlay(!showGroupOverlay)}
						tabIndex={0}
						role="button"
					>
						<FaRegListAlt />
					</span>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedGroup: state.data.selectedGroup,
});

const mapActionsToProps = {
	addPassword,
};

export default connect(mapStateToProps, mapActionsToProps)(AddPassword);
