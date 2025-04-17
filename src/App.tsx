import { Route, BrowserRouter as Router, Routes } from "react-router";
import NavBar from "./components/navbar/NavBar";
import ToastList from "./components/toast/ToastList";
import Login from "./pages/Login";
import MainDash from "./pages/MainDash";

function App() {
	return (
		<Router>
			<ToastList />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/monthlyBudget" element={<MainDash />} />
				<Route
					path="/yearlySummary"
					element={
						<>
							<NavBar />
							<h1 style={{ color: "black" }}>Yearly Summary Coming Soon</h1>
						</>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
