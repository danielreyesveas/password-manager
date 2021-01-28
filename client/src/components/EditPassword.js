import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updatePassword } from "../redux/actions/dataActions";
import GroupOverlay from "./GroupOverlay";
import { useUI } from "../context";

const EditPassword = ({
	groups,
	selectedPassword,
	selectedGroup,
	updatePassword,
}) => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [notes, setNotes] = useState("");
	const [group, setGroup] = useState("");
	const [showGroupOverlay, setShowGroupOverlay] = useState(false);
	const { showEditPassword, setShowEditPassword } = useUI();

	useEffect(() => {
		if (selectedPassword) {
			setName(selectedPassword.name);
			setPassword(selectedPassword.decryptedPassword);
			setUsername(
				selectedPassword.username ? selectedPassword.username : ""
			);
			setWebsite(
				selectedPassword.website ? selectedPassword.website : ""
			);
			setNotes(selectedPassword.notes ? selectedPassword.notes : "");
			console.log(selectedPassword.groupId);
			setGroup(selectedPassword.groupId ? selectedPassword.groupId : "");
		}
	}, [selectedPassword]);

	const handleUpdatePassword = () => {
		if (name.trim() === "" || password.trim() === "") return;

		const pass = {
			id: selectedPassword.id,
			name,
			password,
			groupId: group ? group : null,
			username: username ? username : null,
			website: website ? website : null,
			notes: notes ? notes : null,
		};

		updatePassword(pass);

		setName("");
		setUsername("");
		setWebsite("");
		setPassword("");
		setNotes("");
		setGroup("");
		setShowEditPassword(false);
	};

	return (
		<div
			className={
				showEditPassword ? "add-task add-task__overlay" : "add-task"
			}
			data-testid="add-task-comp"
		>
			{showEditPassword && (
				<div className="add-task__main" data-testid="add-task-main">
					<div data-testid="quick-add-task">
						<span
							aria-label="Cancel adding task"
							className="add-task__cancel-x"
							data-testid="add-task-quick-cancel"
							onClick={() => {
								setShowGroupOverlay(false);
								setShowEditPassword(false);
							}}
							onKeyDown={() => {
								setShowGroupOverlay(false);
								setShowEditPassword(false);
							}}
							tabIndex={0}
							role="button"
						>
							X
						</span>
						<h2 className="header">Edit Password</h2>
					</div>

					<GroupOverlay
						setGroup={setGroup}
						showGroupOverlay={showGroupOverlay}
						setShowGroupOverlay={setShowGroupOverlay}
					/>
					<label>Title:</label>
					<input
						aria-label="Enter the title"
						className="add-task__name"
						data-testid="add-task-content"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label>Group:</label>
					<select
						className="add-task__group"
						onChange={(e) => setGroup(e.target.value)}
						value={group}
					>
						<option value="">All</option>
						{groups?.map((group) => (
							<option key={group.id} value={group.id}>
								{group.name}
							</option>
						))}
					</select>
					<label>User:</label>
					<input
						aria-label="Enter your username"
						className="add-task__content"
						data-testid="add-task-content"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label>Website:</label>
					<input
						aria-label="Enter your website"
						className="add-task__content"
						data-testid="add-task-content"
						type="text"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
					/>
					<label>Password:</label>
					<input
						aria-label="Enter your password"
						className="add-task__content"
						data-testid="add-task-content"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label>Notes:</label>
					<textarea
						aria-label="Enter your notes"
						className="add-task__content"
						rows="4"
						data-testid="add-task-content"
						onChange={(e) => setNotes(e.target.value)}
						value={notes}
					></textarea>
					<button
						className="add-task__submit"
						data-testid="add-task"
						type="button"
						disabled={name === "" || password === ""}
						onClick={() => handleUpdatePassword()}
					>
						Save
					</button>
					<span
						aria-label="Cancel adding a task"
						className="add-task__cancel"
						data-testid="add-task-main-cancel"
						onClick={() => {
							setShowEditPassword(false);
							setShowGroupOverlay(false);
						}}
						onKeyDown={() => {
							setShowEditPassword(false);
							setShowGroupOverlay(false);
						}}
						tabIndex={0}
						role="button"
					>
						Cancel
					</span>
					{/* <span
						className="add-task__project"
						data-testid="show-project-overlay"
						onClick={() => setShowGroupOverlay(!showGroupOverlay)}
						onKeyDown={() => setShowGroupOverlay(!showGroupOverlay)}
						tabIndex={0}
						role="button"
					>
						<FaRegListAlt />
					</span> */}
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	groups: state.data.groups,
	selectedPassword: state.data.selectedPassword,
	selectedGroup: state.data.selectedGroup,
});

const mapActionsToProps = {
	updatePassword,
};

export default connect(mapStateToProps, mapActionsToProps)(EditPassword);
