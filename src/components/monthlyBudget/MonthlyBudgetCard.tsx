import { useEffect, useState } from "react";
import "./monthlyBudget.css";
import { useMutation } from "convex/react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../convex/_generated/api";
import { updateExpense, updateIncome } from "../../redux/monthly/actions";
import { toast } from "../toast/toastObserver";
import ExpenseForm from "./ExpenseForm";
import SummaryTable from "./SummaryTable";

interface MonthIncome {
	value: number;
	details: { name: string; value: number }[];
}
interface MonthExpense {
	value: number;
	details: {
		name: string;
		value: number;
		details: { name: string; value: number }[];
	}[];
}

interface Data {
	months: string[];
	income: Record<string, MonthIncome>;
	expenses: Record<string, MonthExpense>;
	[key: string]: unknown;
}

interface expense {
	name: string;
	value: number;
}

export type MonthData = { income: MonthIncome; expenses: MonthExpense };

const NavBar = ({
	tabs,
	month,
	handleMonthChange,
}: { tabs: string[]; month: string; handleMonthChange: (e: any) => void }) => {
	return (
		<div className="card-tabs">
			{tabs.map((tab) => {
				return (
					<button
						type="button"
						className={month === tab ? "active" : ""}
						onClick={(e) => handleMonthChange(e)}
						key={tab}
						value={tab}
					>
						{tab}
					</button>
				);
			})}
		</div>
	);
};

function getCurrentData({ data, month }: { data: Data; month: string }) {
	const summary: MonthData = {
		income: { value: 0, details: [] },
		expenses: { value: 0, details: [] },
	};
	summary.income = data.income?.[month] ?? { details: [], value: 0 };
	summary.expenses = data.expenses?.[month] ?? { details: [], value: 0 };
	return summary;
}

export default function MonthlyBudgetCard() {
	const budget = useSelector((state: any) => state.monthly.budget);
	const currentMonth = useSelector((state: any) => state.monthly.currentMonth);
	const tabs = [...budget.months];
	const [month, setMonth] = useState(currentMonth);
	const [currentTab, setCurrentTab] = useState("summary");
	const [currentData, setCurrentData] = useState(
		getCurrentData({ data: budget, month }),
	);
	const items = [
		"summary",
		"income",
		...currentData.expenses.details.map((item: expense) => item.name),
	];
	const dispatch = useDispatch();
	const updateData = useMutation(api.yearlyData.updateBudgetData);

	useEffect(() => {
		setCurrentData(getCurrentData({ data: budget, month }));
	}, [budget, month]);

	const handleMonthChange = (e: any) => {
		setMonth(e.target.value);
		setCurrentData(getCurrentData({ data: budget, month: e.target.value }));
		setCurrentTab("summary");
	};

	console.log({budget})

	// TODO: add check for empty fields
	const updateFormData = async ({
		isIncome,
		newData,
	}: { isIncome: boolean; newData: any }) => {
		const id = sessionStorage.getItem("user");

		if (isIncome) {
			dispatch(updateIncome({ month, value: newData }));
			try {
				await updateData({
				user_id: id ?? "",
				year: budget.year,
				newData: budget.income,
				isExpense: false,
			});
			} catch (error) {
				toast.error("Error updating data");
				console.log(error);
			} finally {
				toast.success("Income updated successfully");
			}
		} else {
			dispatch(updateExpense({ month, expense: currentTab, value: newData }));
			try {
				await updateData({
				user_id: id ?? "",
				year: budget.year,
				newData: budget.expenses,
				isExpense: true,
			});
			} catch (error) {
				toast.error("Error updating data");
				console.log(error);
			} finally {
				toast.success(`${currentTab} updated successfully`);
			}
		}
	};

	return (
		<div className="card">
			{NavBar({ tabs, month, handleMonthChange })}
			<div className="card-body">
				<select
					name="tableItems"
					id="tableItems"
					onChange={(e) => setCurrentTab(e.target.value)}
					value={currentTab}
					style={{ marginLeft: "10px" }}
				>
					{items.map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
				{currentData && currentTab === "summary" ? (
					<SummaryTable currentData={currentData} />
				) : (
					<ExpenseForm
						data={currentData}
						expense={currentTab}
						updateFormData={updateFormData}
					/>
				)}
			</div>
		</div>
	);
}
