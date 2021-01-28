import { useEffect } from "react";
import Group from "./Group";

import { connect } from "react-redux";
import { getGroups } from "../redux/actions/dataActions";

const Groups = ({ groups, selectedGroup, getGroups, activeValue = null }) => {
	useEffect(() => {
		getGroups();

		// eslint-disable-next-line
	}, []);

	const groupsMarkup =
		groups.length > 0
			? groups.map((group) => (
					<li
						key={group.id}
						data-doc-id={group.docId}
						className={
							selectedGroup?.id === group.id
								? "active sidebar__project"
								: "sidebar__project"
						}
					>
						<div>
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
};
export default connect(mapStateToProps, mapActionsToProps)(Groups);
