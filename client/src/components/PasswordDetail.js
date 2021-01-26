import { connect } from "react-redux";

const PasswordDetail = ({ password }) => {
	const passwordMarkup = password ? (
		<div className="password-detail">
			<h2>
				{password.icon && (
					<i className={`${password.icon} password-detail-icon`}></i>
				)}
				{password.name}
			</h2>

			<span className="password-detail-username">
				<span className="password-detail-label">User:</span>{" "}
				{password.username}
			</span>
			<span className="password-detail-password">
				<span className="password-detail-label">Password:</span>{" "}
				{password.ecodedPassword}
			</span>
			<span className="password-detail-website">
				<span className="password-detail-label">Website:</span>
				{password.website}
			</span>
			<span className="password-detail-notes">
				<span className="password-detail-label">Notes:</span>
				{password.notes}
			</span>
		</div>
	) : null;

	return <>{passwordMarkup}</>;
};

const mapStateToProps = (state) => ({
	password: state.data.selectedPassword,
});

export default connect(mapStateToProps)(PasswordDetail);
