import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
	FaAngleLeft,
	FaCopy,
	FaEye,
	FaEyeSlash,
	FaPen,
	FaTrash,
} from "react-icons/fa";
import { getPassword, setPassword } from "../redux/actions/dataActions";
import { useUI } from "../context";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordDetail() {
	const password = useSelector((state) => state.data.selectedPassword);
	const dispatch = useDispatch();

	const [decryptedPassword, setDecryptedPassword] = useState("");
	const [passwordField, setPasswordField] = useState(null);
	const { setShowEditPassword, setShowDeletePassword } = useUI();
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

	const handleEditPassword = () => {
		dispatch(getPassword(password.id));
		setShowEditPassword(true);
	};

	const handleDeletePassword = () => {
		dispatch(setPassword(password));
		setShowDeletePassword(true);
	};

	if (!password) return null;

	return (
		<div
			className={
				password
					? "password-detail password-detail__active-password"
					: "password-detail"
			}
		>
			<span
				className="password-detail-back"
				aria-label="Volver"
				onClick={() => dispatch(setPassword(null))}
				onKeyDown={() => dispatch(setPassword(null))}
				tabIndex={0}
				role="button"
			>
				<FaAngleLeft /> Volver
			</span>
			<div>
				<div className="password-detail__title">
					<div>
						{password.icon && (
							<i
								className={`${password.icon} password-detail-icon`}
							></i>
						)}
						<span>{password.name}</span>
					</div>
					<div>
						<span
							aria-label="Editar"
							className="password-detail-edit"
							onClick={handleEditPassword}
							onKeyDown={handleEditPassword}
							tabIndex={0}
							role="button"
						>
							<FaPen />
						</span>
						<span
							aria-label="Eliminar"
							className="password-detail-delete"
							onClick={handleDeletePassword}
							onKeyDown={handleDeletePassword}
							tabIndex={0}
							role="button"
						>
							<FaTrash />
						</span>
					</div>
				</div>

				<span className="password-detail-field">
					<span className="password-detail-label">User:</span>
					{password.username}
				</span>

				<span className="password-detail-field">
					<span className="password-detail-label">Password:</span>
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
	);
}
