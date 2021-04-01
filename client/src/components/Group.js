import { FaPen, FaTrash } from "react-icons/fa";

import { setGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";
import { useDispatch } from "react-redux";

export default function Group({ group }) {
	const { setShowSidebar, setShowEditGroup, setShowDeleteGroup } = useUI();
	const dispatch = useDispatch();
	const { name } = group;

	const handleDeleteGroup = () => {
		dispatch(setGroup(group));
		setShowDeleteGroup(true);
	};

	const handleEditGroup = () => {
		dispatch(setGroup(group));
		setShowEditGroup(true);
	};

	const handleSelectGroup = () => {
		dispatch(setGroup(group));
		setShowSidebar(false);
	};

	return (
		<>
			<span
				aria-label={`Select ${group.name}`}
				role="button"
				tabIndex={0}
				onClick={handleSelectGroup}
				onKeyDown={handleSelectGroup}
				className="sidebar__project-name"
			>
				<span className="sidebar__dot">•</span>
				{name}
			</span>
			<span
				aria-label="Edit project"
				className="sidebar__project-edit"
				onClick={handleEditGroup}
				onKeyDown={handleEditGroup}
				tabIndex={0}
				role="button"
			>
				<FaPen />
			</span>
			<span
				aria-label="Confirm deletion of project"
				className="sidebar__project-delete"
				onClick={handleDeleteGroup}
				onKeyDown={handleDeleteGroup}
				tabIndex={0}
				role="button"
			>
				<FaTrash />
			</span>
		</>
	);
}
