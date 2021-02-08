import { useState } from "react";
import { connect } from "react-redux";
import { addPassword } from "../redux/actions/dataActions";
import GroupOverlay from "./GroupOverlay";
import { useUI } from "../context";

const AddPassword = ({ groups, selectedGroup, addPassword }) => {
	const { showAddPassword, setShowAddPassword } = useUI();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [notes, setNotes] = useState("");
	const [group, setGroup] = useState(null);
	const [showGroupOverlay, setShowGroupOverlay] = useState(false);

	const handleAddPassword = () => {
		if (name.trim() === "" || password.trim() === "") return;

		const pass = {
			name,
			password,
			groupId: group ? group : selectedGroup ? selectedGroup.id : null,
			username: username ? username : null,
			website: website ? website : null,
			notes: notes ? notes : null,
		};

		addPassword(pass);

		setName("");
		setUsername("");
		setWebsite("");
		setPassword("");
		setNotes("");
		setGroup(null);
		setShowAddPassword(false);
	};

	return showAddPassword ? (
		<div
			className="add-password add-password__overlay"
			data-testid="add-password-comp"
		>
			<div className="add-password__main" data-testid="add-password-main">
				<div data-testid="quick-add-password">
					<span
						aria-label="Cancel adding task"
						className="add-password__cancel-x"
						data-testid="add-password-quick-cancel"
						onClick={() => {
							setShowGroupOverlay(false);
							setShowAddPassword(false);
						}}
						onKeyDown={() => {
							setShowGroupOverlay(false);
							setShowAddPassword(false);
						}}
						tabIndex={0}
						role="button"
					>
						X
					</span>
					<h2 className="header">Nueva Contraseña</h2>
				</div>

				<GroupOverlay
					setGroup={setGroup}
					showGroupOverlay={showGroupOverlay}
					setShowGroupOverlay={setShowGroupOverlay}
				/>

				<label>Nombre:</label>
				<input
					aria-label="Enter the title"
					className="add-password__name"
					data-testid="add-password-content"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label>Grupo:</label>
				<select
					className="add-password__group"
					onChange={(e) => setGroup(e.target.value)}
				>
					<option value="">Todos</option>
					{groups?.map((group) => (
						<option key={group.id} value={group.id}>
							{group.name}
						</option>
					))}
				</select>

				<label>Usuario:</label>
				<input
					aria-label="Enter your username"
					className="add-password__content"
					data-testid="add-password-content"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label>Sitio web:</label>
				<input
					aria-label="Enter your website"
					className="add-password__content"
					data-testid="add-password-content"
					type="text"
					value={website}
					onChange={(e) => setWebsite(e.target.value)}
				/>

				<label>Contraseña:</label>
				<input
					aria-label="Enter your password"
					className="add-password__content"
					data-testid="add-password-content"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label>Notas:</label>
				<textarea
					aria-label="Enter your notes"
					className="add-password__content"
					rows="4"
					data-testid="add-password-content"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				></textarea>

				<button
					className="add-password__submit"
					data-testid="add-password"
					type="button"
					disabled={name === "" || password === ""}
					onClick={() => {
						handleAddPassword() && setShowAddPassword(false);
					}}
				>
					Agregar
				</button>
				<span
					aria-label="Cancel adding a task"
					className="add-password__cancel"
					data-testid="add-password-main-cancel"
					onClick={() => {
						setShowAddPassword(false);
						setShowGroupOverlay(false);
					}}
					onKeyDown={() => {
						setShowAddPassword(false);
						setShowGroupOverlay(false);
					}}
					tabIndex={0}
					role="button"
				>
					Cancelar
				</span>

				{/* <span
						className="add-password__project"
						data-testid="show-project-overlay"
						onClick={() => setShowGroupOverlay(!showGroupOverlay)}
						onKeyDown={() => setShowGroupOverlay(!showGroupOverlay)}
						tabIndex={0}
						role="button"
					>
						<FaRegListAlt />
					</span> */}
			</div>
		</div>
	) : null;
};

const mapStateToProps = (state) => ({
	groups: state.data.groups,
	selectedGroup: state.data.selectedGroup,
});

const mapActionsToProps = {
	addPassword,
};

export default connect(mapStateToProps, mapActionsToProps)(AddPassword);
