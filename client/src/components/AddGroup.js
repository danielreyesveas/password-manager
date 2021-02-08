import { useState } from "react";

import { connect } from "react-redux";
import { addGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";

const AddGroup = ({ addGroup }) => {
	const { showAddGroup, setShowAddGroup } = useUI();
	const [name, setName] = useState("");

	const handleAddGroup = () => {
		if (name === "") return;
		addGroup({ name });
		setName("");
		setShowAddGroup(false);
	};

	return (
		<div className="add-project" data-testid="add-project">
			{showAddGroup && (
				<div className="add-project__input">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="add-project__name"
						data-testid="project-name"
						type="text"
						placeholder="Nombre"
					/>
					<button
						className="add-project__submit"
						type="button"
						onClick={() => handleAddGroup()}
						data-testid="add-project-submit"
					>
						Agregar
					</button>
					<span
						aria-label="Cancel adding project"
						className="add-project__cancel"
						data-testid="hide-project-overlay"
						onClick={() => setShowAddGroup(false)}
						onKeyDown={() => setShowAddGroup(false)}
						role="button"
						tabIndex={0}
					>
						Cancelar
					</span>
				</div>
			)}
			{!showAddGroup && (
				<span
					aria-label="Add project"
					className="add-project__text"
					data-testid="add-project-action"
					onClick={() => setShowAddGroup(true)}
					onKeyDown={() => setShowAddGroup(true)}
					role="button"
					tabIndex={0}
				>
					<span className="add-project__plus">+</span> Grupo
				</span>
			)}
		</div>
	);
};

const mapActionsToProps = {
	addGroup,
};

export default connect(null, mapActionsToProps)(AddGroup);
