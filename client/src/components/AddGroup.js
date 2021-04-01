import { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { addGroup } from "../redux/actions/dataActions";
import { useUI } from "../context";

export default function AddGroup() {
	const modalRef = useRef(null);
	const dispatch = useDispatch();
	const { showAddGroup, setShowAddGroup } = useUI();
	const [name, setName] = useState("");

	const handleAddGroup = () => {
		if (name === "") return;
		dispatch(addGroup({ name }));
		setName("");
		setShowAddGroup(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!modalRef.current?.contains(event.target)) {
				if (!showAddGroup) return;
				setShowAddGroup(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showAddGroup, setShowAddGroup]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showAddGroup) return;

			if (event.key === "Escape") {
				setShowAddGroup(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showAddGroup, setShowAddGroup]);

	return (
		<div className="add-project" ref={modalRef}>
			{showAddGroup && (
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
							className="cancel"
							data-type="action"
							onClick={() => setShowAddGroup(false)}
							onKeyDown={() => setShowAddGroup(false)}
							role="button"
							tabIndex={0}
						>
							Cancelar
						</span>
						<button
							className="submit"
							type="button"
							data-type="action"
							onClick={() => handleAddGroup()}
							disabled={name === ""}
						>
							Agregar
						</button>
					</div>
				</div>
			)}
			{!showAddGroup && (
				<div
					aria-label="Nuevo"
					className="add-project-action"
					onClick={() => setShowAddGroup(true)}
					onKeyDown={() => setShowAddGroup(true)}
					data-type="action"
					role="button"
					tabIndex={0}
				>
					<span className="add-project__plus" data-type="action">
						+
					</span>{" "}
					<span className="add-project__text" data-type="action">
						Grupo
					</span>
				</div>
			)}
		</div>
	);
}
