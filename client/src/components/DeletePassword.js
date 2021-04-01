import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../context";
import { deletePassword } from "../redux/actions/dataActions";
import Overlay from "./layout/Overlay";

export default function DeletePassword() {
	const { showDeletePassword, setShowDeletePassword } = useUI();
	const dispatch = useDispatch();
	const id = useSelector((state) => state.data.selectedPassword?.id);

	const handleDeletePassword = () => {
		dispatch(deletePassword(id));
		setShowDeletePassword(false);
	};

	const hideModal = () => {
		setShowDeletePassword(false);
	};

	return showDeletePassword ? (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="delete__main">
				<div className="header-options">
					<span
						aria-label="Cancelar"
						className="cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>
				<div className="delete__inner">
					<div className="delete__message">
						<p>¿Deseas eliminar esta contraseña?</p>
					</div>
					<div className="btns">
						<span
							aria-label="Cancelar"
							className="cancel"
							onClick={hideModal}
							onKeyDown={hideModal}
							tabIndex={0}
							role="button"
						>
							Cancelar
						</span>

						<button
							className="submit"
							type="button"
							onClick={handleDeletePassword}
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</Overlay>
	) : null;
}
