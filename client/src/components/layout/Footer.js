import { FaKey } from "react-icons/fa";
import { useUI } from "../../context";

export default function Footer() {
	const { setShowGenerator } = useUI();

	return (
		<footer className="footer">
			<div>
				<div className="logo" onClick={() => setShowGenerator(true)}>
					<FaKey />
				</div>
			</div>
		</footer>
	);
}
