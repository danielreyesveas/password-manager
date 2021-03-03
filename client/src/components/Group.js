import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import { connect } from "react-redux";
import { setGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";

const Group = ({ group, setGroup }) => {
	const { setShowSidebar, setShowEditGroup } = useUI();
	const { id, name } = group;
	const [showConfirm, setShowConfirm] = useState(false);

	const deleteProject = (id) => {};

	const handleEditGroup = (group) => {
		setGroup(group);
		setShowEditGroup(true);
	};

	return (
		<>
			<span
				aria-label={`Select ${group.name}`}
				role="button"
				tabIndex={0}
				onClick={() => {
					setGroup(group);
					setShowSidebar(false);
				}}
				onKeyDown={() => {
					setGroup(group);
					setShowSidebar(false);
				}}
				className="sidebar__project-name"
			>
				<span className="sidebar__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Edit project"
				className="sidebar__project-edit"
				onClick={() => handleEditGroup(group)}
				onKeyDown={() => handleEditGroup(group)}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirm deletion of project"
				className="sidebar__project-delete"
				data-testid="delete-project"
				onClick={() => setShowConfirm(!showConfirm)}
				onKeyDown={() => setShowConfirm(!showConfirm)}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
				{showConfirm && (
					<div className="project-delete-modal">
						<span className="project-delete-modal__inner">
							<p>¿Estás seguro de eliminarlo?</p>
							<button
								type="button"
								onClick={() => deleteProject(id)}
								onKeyDown={() => deleteProject(id)}
							>
								Eliminar
							</button>
							<span
								aria-label="Cancel adding project, do not delete"
								onClick={() => setShowConfirm(!showConfirm)}
								onKeyDown={() => setShowConfirm(!showConfirm)}
								tabIndex={0}
								role="button"
							>
								Cancelar
							</span>
						</span>
					</div>
				)}
			</span>
		</>
	);
};

const mapActionsToProps = {
	setGroup,
};

export default connect(null, mapActionsToProps)(Group);
