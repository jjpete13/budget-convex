import { useQuery } from "convex/react";
import NavBar from "../components/navbar/NavBar";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import MonthlyBudgetCard from "../components/monthlyBudget/MonthlyBudgetCard";

export default function MainDash() {
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const data = useQuery(api.yearlyData.getYearlyData, {user_id: sessionStorage.getItem('user') || "", year: year});
  // Add error handling for if the year doesn't exist yet in the database


  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    if (!data) {
      setIsLoading(true);
    }
  }, [data]);



  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <NavBar />
      <MonthlyBudgetCard data={data?.[0]} currentMonth={month} currentYear={year} />
    </div>
  )
}