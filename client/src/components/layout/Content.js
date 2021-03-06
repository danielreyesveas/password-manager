import Sidebar from "./Sidebar";
import Passwords from "../Passwords";
import PasswordDetail from "../PasswordDetail";

export default function Content() {
	return (
		<section className="content">
			<Sidebar />
			<div className="container">
				<Passwords />
				<PasswordDetail />
			</div>
		</section>
	);
}
