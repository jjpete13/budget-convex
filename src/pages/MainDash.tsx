import { useQuery } from "convex/react";
import NavBar from "../components/navbar/NavBar";
import CardWithTabs from "../components/monthlyBudget/CardWithTabs";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

export default function MainDash() {
  const [isLoading, setIsLoading] = useState(true);
  const data = useQuery(api.yearlyData.getYearlyData, {user_id: sessionStorage.getItem('user') || "", year: 2025});

  console.log(data)

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
      <CardWithTabs data={data?.[0]} />
    </div>
  )
}