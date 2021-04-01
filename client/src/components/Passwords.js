import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPasswords, setPassword } from "../redux/actions/dataActions";

export default function Passwords() {
	const passwords = useSelector((state) => state.data.selectedPasswords);
	const selectedPassword = useSelector(
		(state) => state.data.selectedPassword
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPasswords());
		// eslint-disable-next-line
	}, []);

	return (
		<div
			className={
				selectedPassword
					? "passwords passwords__active-password"
					: "passwords"
			}
		>
			<ul className="passwords__list">
				{passwords.length > 0 &&
					passwords.map((password) => (
						<li
							key={password.id}
							onClick={() => dispatch(setPassword(password.id))}
							className={
								selectedPassword?.id === password.id
									? "passwords__list_password active"
									: "passwords__list_password"
							}
						>
							{password.icon && (
								<i
									className={`${password.icon} passwords__list-icon`}
								></i>
							)}
							<span className="passwords__list-title">
								{password.name}
							</span>
							<span className="passwords__list-descr thin">
								{password.username}
							</span>
						</li>
					))}
			</ul>
		</div>
	);
}
