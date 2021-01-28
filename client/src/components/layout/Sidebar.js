import { useState } from "react";
import { FaChevronDown, FaInbox } from "react-icons/fa";

import { connect } from "react-redux";
import AddGroup from "../AddGroup";
import Groups from "../Groups";
import { setGroup } from "../../redux/actions/dataActions";
import EditGroup from "../EditGroup";

const Sidebar = ({ showEditGroup, selectedGroup, setGroup }) => {
	const [showGroups, setShowGroups] = useState(true);

	return (
		<>
			<div className="sidebar" data-testid="sidebar">
				<ul className="sidebar__generic">
					<div
						className="sidebar__middle"
						aria-label="Show/hide projects"
						onClick={() => setShowGroups(!showGroups)}
						onKeyDown={() => setShowGroups(!showGroups)}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaChevronDown
								className={
									!showGroups ? "hidden-projects" : undefined
								}
							/>
						</span>
						<h2>Groups</h2>
					</div>

					<ul className="sidebar__projects">
						<li className={!selectedGroup ? "active" : undefined}>
							<div
								data-testid="inbox"
								onClick={() => {
									setGroup(null);
								}}
								onKeyDown={() => {
									setGroup(null);
								}}
								tabIndex={0}
								role="button"
							>
								<span className="sidebar__default-name">
									<span>
										<FaInbox />
									</span>
									All
								</span>
							</div>
						</li>
						{showGroups && <Groups />}
					</ul>
				</ul>
				{showGroups && !showEditGroup && <AddGroup />}
				{showEditGroup && <EditGroup />}
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	selectedGroup: state.data.selectedGroup,
	showEditGroup: state.data.showEditGroup,
});

const mapActionsToProps = {
	setGroup,
};

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
