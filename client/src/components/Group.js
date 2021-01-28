import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import { connect } from "react-redux";
import { setGroup, setShowEditGroup } from "../redux/actions/dataActions";

const Group = ({ group, setGroup, showEditGroup, setShowEditGroup }) => {
	const { id, name } = group;
	const [showConfirm, setShowConfirm] = useState(false);

	const deleteProject = (id) => {};

	const selectGroup = (group) => {
		setGroup(group);
	};

	return (
		<>
			<span
				aria-label={`Select ${group.name}`}
				role="button"
				tabIndex={0}
				onClick={() => {
					selectGroup(group);
				}}
				onKeyDown={() => {
					selectGroup(group);
				}}
				className="sidebar__project-name"
			>
				<span className="sidebar__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Edit project"
				className="sidebar__project-edit"
				onClick={() => setShowEditGroup(group)}
				onKeyDown={() => setShowEditGroup(group)}
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
							<p>Are you sure you want to delete this project?</p>
							<button
								type="button"
								onClick={() => deleteProject(id)}
								onKeyDown={() => deleteProject(id)}
							>
								Delete
							</button>
							<span
								aria-label="Cancel adding project, do not delete"
								onClick={() => setShowConfirm(!showConfirm)}
								onKeyDown={() => setShowConfirm(!showConfirm)}
								tabIndex={0}
								role="button"
							>
								Cancel
							</span>
						</span>
					</div>
				)}
			</span>
		</>
	);
};

const mapStateToProps = (state) => ({
	showEditGroup: state.data.showEditGroup,
});

const mapActionsToProps = {
	setGroup,
	setShowEditGroup,
};

export default connect(mapStateToProps, mapActionsToProps)(Group);
