import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Group({ group }) {
	const { id, name } = group;
	const [showConfirm, setShowConfirm] = useState(false);

	const deleteProject = (id) => {};

	return (
		<>
			<span className="sidebar__dot">•</span>
			<span className="sidebar__project-name">{name}</span>
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
}
