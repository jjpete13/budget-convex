import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../convex/_generated/api";
import MonthlyBudgetCard from "../components/monthlyBudget/MonthlyBudgetCard";
import NavBar from "../components/navbar/NavBar";
import { getMonthlyBudget } from "../redux/monthly/actions";

export default function MainDash() {
	const [isLoading, setIsLoading] = useState(true);
	const year = new Date().getFullYear();
	const data = useQuery(api.yearlyData.getYearlyData, {
		user_id: sessionStorage.getItem("user") || "",
		year: year,
	});
	const dispatch = useDispatch();
	//TODO: Add error handling for if the year doesn't exist yet in the database

	useEffect(() => {
		if (data?.[0]) {
			setIsLoading(false);
			dispatch(getMonthlyBudget(data[0]));
		}
		if (!data) {
			setIsLoading(true);
		}
	}, [data, dispatch]);

	if (isLoading) return <div>Loading...</div>;
	return (
		<div>
			<NavBar />
			<MonthlyBudgetCard />
		</div>
	);
}
