import { useState } from "react";

import { connect } from "react-redux";
import { updateGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";

const EditGroup = ({ selectedGroup, updateGroup }) => {
	const { setShowEditGroup } = useUI();
	const [name, setName] = useState(selectedGroup?.name);

	const handleUpdateGroup = () => {
		if (name === "") return;
		updateGroup({ id: selectedGroup.id, name });
		setName("");
		setShowEditGroup(null);
	};

	return (
		<div className="add-project" data-testid="add-project">
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
					onClick={() => handleUpdateGroup()}
					data-testid="add-project-submit"
				>
					Guardar
				</button>
				<span
					aria-label="Cancel adding project"
					className="add-project__cancel"
					data-testid="hide-project-overlay"
					onClick={() => setShowEditGroup(null)}
					onKeyDown={() => setShowEditGroup(null)}
					role="button"
					tabIndex={0}
				>
					Cancelar
				</span>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedGroup: state.data.selectedGroup,
});

const mapActionsToProps = {
	updateGroup,
};

export default connect(mapStateToProps, mapActionsToProps)(EditGroup);
