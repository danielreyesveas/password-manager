import { useEffect } from "react";

import { connect } from "react-redux";
import { getPasswords, setPassword } from "../redux/actions/dataActions";

const Passwords = ({
	passwords,
	selectedPassword,
	getPasswords,
	setPassword,
}) => {
	useEffect(() => {
		getPasswords();

		// eslint-disable-next-line
	}, []);

	const passwordsMarkup =
		passwords.length > 0
			? passwords.map((password) => {
					return (
						<li
							key={password.id}
							onClick={() => setPassword(password.id)}
							className={
								selectedPassword?.id === password.id
									? "active"
									: undefined
							}
						>
							{password.icon && (
								<i
									className={`${password.icon} tasks__list-icon`}
								></i>
							)}
							<span className="tasks__list-title">
								{password.name}
							</span>
							<span className="tasks__list-descr thin">
								{password.username}
							</span>
						</li>
					);
			  })
			: null;

	return (
		<div className="tasks" data-testid="tasks">
			<ul className="tasks__list">{passwordsMarkup}</ul>

			{/* <AddPassword /> */}
		</div>
	);
};

const mapStateToProps = (state) => ({
	passwords: state.data.selectedPasswords,
	selectedPassword: state.data.selectedPassword,
});

const mapActionsToProps = {
	getPasswords,
	setPassword,
};
export default connect(mapStateToProps, mapActionsToProps)(Passwords);
