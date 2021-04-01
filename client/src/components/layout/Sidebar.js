import { useRef, useState } from "react";
import { FaChevronDown, FaInbox } from "react-icons/fa";

import AddGroup from "../AddGroup";
import Groups from "../Groups";
import { setGroup } from "../../redux/actions/dataActions";
import EditGroup from "../EditGroup";
import { useUI } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Sidebar() {
	const [showGroups, setShowGroups] = useState(true);
	const sidebarRef = useRef(null);
	const { showSidebar, setShowSidebar, showEditGroup } = useUI();
	const selectedGroup = useSelector((state) => state.data.selectedGroup);
	const dispatch = useDispatch();

	const handleSelect = () => {
		dispatch(setGroup(null));
		setShowSidebar(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				!sidebarRef.current?.contains(event.target) &&
				event.target.getAttribute("data-type") !== "action"
			) {
				if (!showSidebar) return;
				setShowSidebar(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("click", handleOutsideClick);
		}

		if (typeof window !== "undefined") {
			return () =>
				window.removeEventListener("click", handleOutsideClick);
		}
	}, [showSidebar, setShowSidebar]);

	useEffect(() => {
		const handleEscape = (event) => {
			if (!showSidebar) return;
			if (event.key === "Escape") {
				setShowSidebar(false);
			}
		};

		document.addEventListener("keyup", handleEscape);
		return () => document.removeEventListener("keyup", handleEscape);
	}, [showSidebar, setShowSidebar]);

	return (
		<>
			<div
				className={showSidebar ? "sidebar show-sidebar" : "sidebar"}
				ref={sidebarRef}
			>
				<ul className="sidebar__generic">
					<div
						className="sidebar__middle"
						aria-label="Proyectos"
						onClick={() => setShowGroups(!showGroups)}
						onKeyDown={() => setShowGroups(!showGroups)}
						tabIndex={0}
						role="button"
					>
						<span>
							<FaChevronDown
								className={
									!showGroups ? "hidden-projects" : undefined
								}
							/>
						</span>
						<h2>Grupos</h2>
					</div>

					<ul className="sidebar__projects">
						<li
							className={!selectedGroup ? "active" : undefined}
							onClick={handleSelect}
							onKeyDown={handleSelect}
							tabIndex={0}
							role="button"
						>
							<div className="sidebar__default-name">
								<FaInbox />
								<span>Todos</span>
							</div>
						</li>
						<Groups showGroups={showGroups} />
					</ul>
				</ul>
				{showGroups && !showEditGroup && <AddGroup />}
				{showEditGroup && <EditGroup />}
			</div>
		</>
	);
}
