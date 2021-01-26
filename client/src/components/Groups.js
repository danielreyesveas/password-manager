import { useEffect } from "react";
import Group from "./Group";

import { connect } from "react-redux";
import { getGroups, setGroup } from "../redux/actions/dataActions";

const Groups = ({
	groups,
	selectedGroup,
	getGroups,
	setGroup,
	activeValue = null,
}) => {
	useEffect(() => {
		getGroups();

		// eslint-disable-next-line
	}, []);

	const selectGroup = (projectId) => {
		setGroup(projectId);
	};

	const groupsMarkup =
		groups.length > 0
			? groups.map((group) => (
					<li
						key={group.id}
						data-doc-id={group.docId}
						className={
							selectedGroup === group.id
								? "active sidebar__project"
								: "sidebar__project"
						}
					>
						<div
							data-testid="project-action"
							aria-label={`Select ${group.name}`}
							role="button"
							tabIndex={0}
							onClick={() => {
								selectGroup(group.id);
							}}
							onKeyDown={() => {
								selectGroup(group.id);
							}}
						>
							<Group group={group} />
						</div>
					</li>
			  ))
			: null;

	return <div>{groupsMarkup}</div>;
};

const mapStateToProps = (state) => ({
	groups: state.data.groups,
	selectedGroup: state.data.selectedGroup,
});

const mapActionsToProps = {
	getGroups,
	setGroup,
};
export default connect(mapStateToProps, mapActionsToProps)(Groups);
