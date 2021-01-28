import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaCopy, FaEye, FaEyeSlash, FaPen, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import { getPassword } from "../redux/actions/dataActions";
import { useShowEditPassword } from "../context";

const PasswordDetail = ({ password, getPassword }) => {
	const [decryptedPassword, setDecryptedPassword] = useState("");
	const [passwordField, setPasswordField] = useState(null);
	const { setShowEditPassword } = useShowEditPassword();
	const copyRef = useRef(null);

	useLayoutEffect(() => {
		if (passwordField) {
			setTimeout(() => {
				setPasswordField(null);
			}, 5000);
		}
	}, [passwordField]);

	useEffect(() => {
		setDecryptedPassword("");
		setPasswordField(null);
	}, [password]);

	const copyPassword = () => {
		copyRef.current.select();
		document.execCommand("copy");
	};

	const deleteProject = (id) => {};

	const [showConfirm, setShowConfirm] = useState(false);

	const handleCopyPassword = () => {
		if (!decryptedPassword) {
			decryptPassword()
				.then((response) => {
					const { decrypted } = response.data;
					setDecryptedPassword(decrypted);
					copyPassword();
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			copyPassword();
		}
	};

	const decryptPassword = () => {
		return axios.post("/decrypt-password", password);
	};

	const handleDecryptPassword = () => {
		if (passwordField) {
			setPasswordField(null);
		} else {
			if (!decryptedPassword) {
				decryptPassword()
					.then((response) => {
						const { decrypted } = response.data;
						setDecryptedPassword(decrypted);
						setPasswordField(decrypted);
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				setPasswordField(decryptedPassword);
			}
		}
	};

	const passwordMarkup = password ? (
		<div className="password-detail">
			<div>
				<span>
					{password.icon && (
						<i
							className={`${password.icon} password-detail-icon`}
						></i>
					)}
					{password.name}
				</span>
				<span
					aria-label="Edit project"
					className="password-detail-edit"
					onClick={() => {
						getPassword(password.id);
						setShowEditPassword(true);
					}}
					onKeyDown={() => {
						getPassword(password.id);
						setShowEditPassword(true);
					}}
					tabIndex={0}
					role="button"
				>
					<FaPen />
				</span>
				<span
					aria-label="Confirm deletion of project"
					className="password-detail-delete"
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
								<p>
									Are you sure you want to delete this
									project?
								</p>
								<button
									type="button"
									onClick={() => deleteProject(password.id)}
									onKeyDown={() => deleteProject(password.id)}
								>
									Delete
								</button>
								<span
									aria-label="Cancel adding project, do not delete"
									onClick={() => setShowConfirm(!showConfirm)}
									onKeyDown={() =>
										setShowConfirm(!showConfirm)
									}
									tabIndex={0}
									role="button"
								>
									Cancel
								</span>
							</span>
						</div>
					)}
				</span>

				<span className="password-detail-field">
					<span className="password-detail-label">User:</span>{" "}
					{password.username}
				</span>

				<span className="password-detail-field">
					<span className="password-detail-label">Password:</span>{" "}
					<span className="password-detail-encrypted-password">
						<input
							value={decryptedPassword}
							ref={copyRef}
							readOnly
							className="invisible"
						/>
						{passwordField
							? passwordField
							: password.encodedPassword}
					</span>
					<span
						aria-label="Show"
						className="password-detail-actions"
						onClick={handleDecryptPassword}
						tabIndex={0}
						role="button"
					>
						{passwordField ? <FaEyeSlash /> : <FaEye />}
					</span>
					<span
						aria-label="Copy"
						className="password-detail-actions"
						onClick={handleCopyPassword}
						tabIndex={0}
						role="button"
					>
						<FaCopy />
					</span>
				</span>

				<span className="password-detail-field">
					<span className="password-detail-label">Website:</span>
					{password.website}
				</span>

				<span className="password-detail-field">
					<span className="password-detail-label">Notes:</span>
					{password.notes}
				</span>
			</div>
		</div>
	) : null;

	return <>{passwordMarkup}</>;
};

const mapStateToProps = (state) => ({
	password: state.data.selectedPassword,
});

const mapActionsToProps = {
	getPassword,
};

export default connect(mapStateToProps, mapActionsToProps)(PasswordDetail);
