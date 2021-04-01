import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../context";
import { deleteGroup } from "../redux/actions/dataActions";
import Overlay from "./layout/Overlay";

export default function DeleteGroup() {
	const { showDeleteGroup, setShowDeleteGroup } = useUI();
	const dispatch = useDispatch();
	const id = useSelector((state) => state.data.selectedGroup?.id);

	const handleDeleteGroup = () => {
		dispatch(deleteGroup(id));
		setShowDeleteGroup(false);
	};

	const hideModal = () => {
		setShowDeleteGroup(false);
	};

	return showDeleteGroup ? (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="delete__main">
				<div className="delete__header-options">
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
						<p>¿Deseas eliminar este grupo?</p>
					</div>
					<div className="btns">
						<span
							aria-label="Cancelar"
							className="cancel"
							onClick={hideModal}
							onKeyDown={hideModal}
							tabIndex={0}
							role="button"
							data-type="action"
						>
							Cancelar
						</span>

						<button
							className="submit"
							type="button"
							onClick={handleDeleteGroup}
							data-type="action"
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</Overlay>
	) : null;
}
