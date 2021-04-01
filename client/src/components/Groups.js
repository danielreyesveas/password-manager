import { useEffect } from "react";
import Group from "./Group";
import { getGroups } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";

export default function Groups({ showGroups }) {
	const groups = useSelector((state) => state.data.groups);
	const selectedGroup = useSelector((state) => state.data.selectedGroup);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGroups());
		// eslint-disable-next-line
	}, []);

	if (!showGroups) return null;

	return (
		groups.length > 0 &&
		groups.map((group) => (
			<li
				key={group.id}
				className={
					selectedGroup?.id === group.id
						? "active sidebar__project"
						: "sidebar__project"
				}
			>
				<Group group={group} />
			</li>
		))
	);
}
