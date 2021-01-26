import { useState } from "react";

import { connect } from "react-redux";
import { addGroup } from "../redux/actions/dataActions";

const AddGroup = ({ shouldShow = false, addGroup }) => {
	const [show, setShow] = useState(shouldShow);
	const [name, setName] = useState("");

	const handleAddGroup = () => {
		if (name === "") return;
		addGroup({ name });
		setName("");
		setShow(false);
	};

	return (
		<div className="add-project" data-testid="add-project">
			{show && (
				<div className="add-project__input">
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="add-project__name"
						data-testid="project-name"
						type="text"
						placeholder="Name your group"
					/>
					<button
						className="add-project__submit"
						type="button"
						onClick={() => handleAddGroup()}
						data-testid="add-project-submit"
					>
						Add
					</button>
					<span
						aria-label="Cancel adding project"
						className="add-project__cancel"
						data-testid="hide-project-overlay"
						onClick={() => setShow(false)}
						onKeyDown={() => setShow(false)}
						role="button"
						tabIndex={0}
					>
						Cancel
					</span>
				</div>
			)}
			{!show && (
				<span
					aria-label="Add project"
					className="add-project__text"
					data-testid="add-project-action"
					onClick={() => setShow(!show)}
					onKeyDown={() => setShow(!show)}
					role="button"
					tabIndex={0}
				>
					<span className="add-project__plus">+</span> Group
				</span>
			)}
		</div>
	);
};

const mapActionsToProps = {
	addGroup,
};

export default connect(null, mapActionsToProps)(AddGroup);
