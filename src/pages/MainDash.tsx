import { useQuery } from "convex/react";
import NavBar from "../components/navbar/NavBar";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import MonthlyBudgetCard from "../components/monthlyBudget/MonthlyBudgetCard";
import { useDispatch } from "react-redux";
import { getMonthlyBudget } from "../redux/monthly/actions";

export default function MainDash() {
  const [isLoading, setIsLoading] = useState(true);
  const year = new Date().getFullYear();
  const data = useQuery(api.yearlyData.getYearlyData, {user_id: sessionStorage.getItem('user') || "", year: year});
  const dispatch = useDispatch();
  // Add error handling for if the year doesn't exist yet in the database


  useEffect(() => {
    if (data && data[0]) {
      setIsLoading(false);
      dispatch(getMonthlyBudget(data[0]));
    }
    if (!data) {
      setIsLoading(true);
    }
  }, [data]);



  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <NavBar />
      <MonthlyBudgetCard />
    </div>
  )
}