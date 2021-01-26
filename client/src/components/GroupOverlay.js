import { connect } from "react-redux";

const GroupOverlay = ({
	groups,
	setGroup,
	showGroupOverlay,
	setShowGroupOverlay,
}) => {
	return (
		groups &&
		showGroupOverlay && (
			<div className="project-overlay" data-testid="project-overlay">
				<ul className="project-overlay__list">
					{groups.map((group) => (
						<li key={group.id}>
							<div
								data-testid="project-overlay-action"
								aria-label="Select the task project"
								onClick={() => {
									setGroup(group.id);
									setShowGroupOverlay(false);
								}}
								onKeyDown={() => {
									setGroup(group.id);
									setShowGroupOverlay(false);
								}}
								tabIndex={0}
								role="button"
							>
								{group.name}
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	);
};

const mapStateToProps = (state) => ({
	groups: state.data.groups,
});

export default connect(mapStateToProps)(GroupOverlay);
