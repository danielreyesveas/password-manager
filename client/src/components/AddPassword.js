import { useState } from "react";
import { addPassword } from "../redux/actions/dataActions";
import { useUI } from "../context";
import { useDispatch, useSelector } from "react-redux";
import Overlay from "./layout/Overlay";

export default function AddPassword() {
	const { setShowAddPassword } = useUI();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [website, setWebsite] = useState("");
	const [password, setPassword] = useState("");
	const [notes, setNotes] = useState("");
	const [group, setGroup] = useState(null);

	const selectedGroup = useSelector((state) => state.data.selectedGroup);
	const groups = useSelector((state) => state.data.groups);
	const dispatch = useDispatch();

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

		dispatch(addPassword(pass));

		setName("");
		setUsername("");
		setWebsite("");
		setPassword("");
		setNotes("");
		setGroup(null);
		setShowAddPassword(false);
	};

	const hideModal = () => {
		setShowAddPassword(false);
	};

	return (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="add-password__main">
				<div className="dialog-header-options">
					<h3>Nueva Contraseña</h3>
					<span
						aria-label="Cancelar"
						className="cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>

				<label>Nombre:</label>
				<input
					aria-label="Nombre"
					className="add-password__name"
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
					aria-label="Nombre de Usuario"
					className="add-password__content"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label>Sitio web:</label>
				<input
					aria-label="Sitio Web"
					className="add-password__content"
					type="text"
					value={website}
					onChange={(e) => setWebsite(e.target.value)}
				/>

				<label>Contraseña:</label>
				<input
					aria-label="Contraseña"
					className="add-password__content"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label>Notas:</label>
				<textarea
					aria-label="Notas"
					className="add-password__content"
					rows="4"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				></textarea>

				<div className="btns">
					<span
						aria-label="Cancelar"
						className="cancel"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						Cancelar
					</span>
					<button
						className="submit"
						type="button"
						disabled={name === "" || password === ""}
						onClick={handleAddPassword}
					>
						Agregar
					</button>
				</div>
			</div>
		</Overlay>
	);
}
