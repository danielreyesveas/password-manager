import Sidebar from "./Sidebar";
import Passwords from "../Passwords";
import PasswordDetail from "../PasswordDetail";

const Content = () => {
	return (
		<section className="content">
			<Sidebar />
			<Passwords />
			<PasswordDetail />
		</section>
	);
};

export default Content;
