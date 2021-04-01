import { useEffect, useRef, useState } from "react";

import { updateGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";
import { useDispatch, useSelector } from "react-redux";

export default function EditGroup() {
	const modalRef = useRef(null);
	const dispatch = useDispatch();
	const selectedGroup = useSelector((state) => state.data.selectedGroup);
	const { showEditGroup, setShowEditGroup } = useUI();
	const [name, setName] = useState(selectedGroup?.name);

	const handleUpdateGroup = () => {
		if (name === "") return;
		dispatch(updateGroup({ id: selectedGroup.id, name }));
		setName("");
		setShowEditGroup(null);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!modalRef.current?.contains(event.target)) {
				if (!showEditGroup) return;
				setShowEditGroup(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showEditGroup, setShowEditGroup]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showEditGroup) return;

			if (event.key === "Escape") {
				setShowEditGroup(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showEditGroup, setShowEditGroup]);

	return (
		<div className="add-project" ref={modalRef}>
			<div className="add-project__input">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="add-project__name"
					type="text"
					placeholder="Nombre"
				/>

				<div className="add-project__btns">
					<span
						aria-label="Cancelar"
						className="add-project__cancel"
						onClick={() => setShowEditGroup(null)}
						onKeyDown={() => setShowEditGroup(null)}
						role="button"
						tabIndex={0}
					>
						Cancelar
					</span>
					<button
						className="add-project__submit"
						type="button"
						onClick={() => handleUpdateGroup()}
					>
						Guardar
					</button>
				</div>
			</div>
		</div>
	);
}
