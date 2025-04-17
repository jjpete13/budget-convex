import { useRef, useState } from "react";
import "./Login.css";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import { toast } from "../toast/toastObserver";

export default function LoginCard() {
	const userRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [colorful, setColorful] = useState<boolean>(false);
	const navigate = useNavigate();
	const user = useMutation(api.users.confirmUser);

	const handleOnBlur = (
		id: string,
		ref: React.RefObject<HTMLInputElement | null>,
	) => {
		if (ref.current?.value !== null && ref.current?.value !== "") {
			(document.getElementById(id) as HTMLDivElement).style.opacity = "0";
		}
	};

	const handleOnFocus = (
		id: string,
		ref: React.RefObject<HTMLInputElement | null>,
	) => {
		if (ref.current?.value !== null) {
			(document.getElementById(id) as HTMLDivElement).style.opacity = "1";
		}
	};

	const handleLogin = async () => {
		const checkUser = await user({
			username: userRef.current?.value || "",
			password: passRef.current?.value || "",
		});
		if (!checkUser) return toast.error("Invalid username or password");
		sessionStorage.setItem("user", checkUser || "");
		toast.success("Login successful");
		navigate("/monthlyBudget");
	};

	return (
		<div className="login" id={colorful ? "colorful" : ""}>
			<h1
				style={{ color: colorful ? "#00ffea" : "", cursor: "pointer" }}
				onClick={() => setColorful(!colorful)}
			>
				Login
			</h1>
			<div className="input-group" id="user">
				<input
					type="text"
					ref={userRef}
					onBlur={() => handleOnBlur("user-label", userRef)}
					onFocus={() => {
						handleOnFocus("user-label", userRef);
					}}
				/>
				<label htmlFor="username" id="user-label">
					Username
				</label>
			</div>
			<div className="input-group">
				<input
					type="password"
					ref={passRef}
					onBlur={() => handleOnBlur("password-label", passRef)}
					onFocus={() => {
						handleOnFocus("password-label", passRef);
					}}
				/>
				<label htmlFor="password" id="password-label">
					Password
				</label>
			</div>
			<button type="submit" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
}
