import axios from "axios";
import { useLayoutEffect, useRef, useState } from "react";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import { connect } from "react-redux";

const PasswordDetail = ({ password }) => {
	const [decryptedPassword, setDecryptedPassword] = useState("");
	const [passwordField, setPasswordField] = useState(null);
	const copyRef = useRef(null);

	useLayoutEffect(() => {
		if (passwordField) {
			setTimeout(() => {
				setPasswordField(null);
			}, 5000);
		}
	}, [passwordField]);

	const copyPassword = () => {
		copyRef.current.select();
		document.execCommand("copy");
	};

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
			<h2>
				{password.icon && (
					<i className={`${password.icon} password-detail-icon`}></i>
				)}
				{password.name}
			</h2>

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
					{passwordField ? passwordField : password.ecodedPassword}
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
	) : null;

	return <>{passwordMarkup}</>;
};

const mapStateToProps = (state) => ({
	password: state.data.selectedPassword,
});

export default connect(mapStateToProps)(PasswordDetail);
