import { useNavigate } from "react-router";
import { toast } from "../toast/toastObserver";
import "./NavBar.css";

export default function NavBar() {
	const navigate = useNavigate();
	const url = window.location.href;

	const handleLogout = () => {
		navigate("/");
		toast.success("Logout successful");
	};

	const NavButton = ({
		clickHandler,
		text,
		style,
		disabled,
	}: {
		clickHandler: () => void;
		text: string;
		style?: React.CSSProperties;
		disabled?: boolean;
	}) => {
		return (
			<button
				type="button"
				className="nav-button"
				disabled={disabled}
				style={{ ...style }}
				onClick={clickHandler}
			>
				{text}
			</button>
		);
	};

	return (
		<nav className="navbar">
			<NavButton
				disabled={url.includes("monthlyBudget")}
				clickHandler={() => navigate("/monthlyBudget")}
				text="Monthly Budget"
			/>
			<NavButton
				disabled={url.includes("yearlySummary")}
				clickHandler={() => navigate("/yearlySummary")}
				text="Yearly Summary"
			/>
			<NavButton
				style={{ marginLeft: "auto" }}
				clickHandler={handleLogout}
				text="Logout"
			/>
		</nav>
	);
}
