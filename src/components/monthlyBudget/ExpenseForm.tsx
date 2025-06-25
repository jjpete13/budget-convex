import { use, useEffect, useRef, useState } from "react";
import type React from "react";
import "./monthlyBudget.css";
import type { MonthData } from "./MonthlyBudgetCard";

const ExpenseRow = ({
	index,
	name,
	value,
	handleChange,
}: {
	index: number;
	name: string;
	value: number;
	handleChange: (
		index: number,
		field: "name" | "value",
		value: string | number,
	) => void;
}) => {
	const nameRef = useRef<string>("");
	const valueRef = useRef<number>(0);
	const handleChangeRef = (
		ref: React.RefObject<string | number>,
		value: string | number,
	) => {
		ref.current = value;
	};
	return (
		<>
			<input
				type="text"
				defaultValue={name}
				onChange={(e) => handleChangeRef(nameRef, e.target.value)}
				onBlur={() => handleChange(index, "name", nameRef.current)}
			/>
			<input
				type="number"
				defaultValue={value}
				onChange={(e) =>
					handleChangeRef(valueRef, Number.parseInt(e.target.value))
				}
				onBlur={() => handleChange(index, "value", valueRef.current)}
			/>
		</>
	);
};

export default function ExpenseForm({
	data,
	expense,
	updateFormData,
}: {
	data: MonthData;
	expense: string;
	updateFormData: ({
		isIncome,
		newData,
	}: { isIncome: boolean; newData: any }) => void;
}) {
	const initialData =
		expense === "income"
			? data.income
			: data.expenses.details.find((item) => item.name === expense);
	const [formData, setFormData] = useState(initialData);
	const [disabled, setDisabled] = useState<boolean>(formData === initialData);

	useEffect(() => {
		setFormData(
			expense === "income"
				? data.income
				: data.expenses.details.find((item) => item.name === expense),
		);
	}, [expense, data]);

	useEffect(() => {
		setDisabled(formData === initialData);
	}, [formData, initialData]);

	const handleAddRow = () => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						value: prev.value,
						details: [...prev.details, { name: "", value: 0 }],
					}
				: formData,
		);
	};

	const handleRemoveRow = (index: number) => {
		setFormData((prev) =>
			prev
				? {
						...prev,
						value: prev.value,
						details: prev.details.filter((item, i) => i !== index),
					}
				: formData,
		);
	};

	const handleCancel = () => {
		setFormData(
			expense === "income"
				? data.income
				: data.expenses?.details.find((item) => item.name === expense),
		);
	};

	const handleUpdate = (
		index: number,
		field: "name" | "value",
		value: string | number,
	) => {
		console.log(value);
		setFormData((prev) =>
			prev
				? {
						...prev,
						details: prev.details.map((item, i) =>
							i === index ? { ...item, [field]: value } : item,
						),
					}
				: formData,
		);
	};

	return (
		<div className="expense-form">
			{formData && (
				<>
					<div className="total">
						<h2>{expense}</h2>
						<h2>{formData.value}</h2>
					</div>
					<form>
						{(formData?.details || []).map((item, index) => (
							<div
								className="item"
								key={`expense_${item.name}`}
								style={{ display: "flex", gap: "1rem", margin: "1rem" }}
							>
								<ExpenseRow
									key={`${item.name}-${index}`}
									index={index}
									name={item.name}
									value={item.value}
									handleChange={handleUpdate}
								/>
								<button
									style={{
										opacity: index === formData.details.length - 1 ? 1 : 0,
									}}
									disabled={index !== formData.details.length - 1}
									onClick={() => handleRemoveRow(index)}
									type="button"
								>
									X
								</button>
							</div>
						))}
					</form>
				</>
			)}
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "start",
					gap: "1em",
				}}
			>
				<button
					type="button"
					onClick={handleAddRow}
					style={{ marginLeft: "1em" }}
				>
					+
				</button>
				<button
					disabled={disabled}
					type="button"
					style={{ marginLeft: "auto" }}
					onClick={handleCancel}
				>
					Cancel
				</button>
				<button
					disabled={disabled}
					type="submit"
					style={{ marginRight: "1em" }}
					onClick={() =>
						updateFormData({
							isIncome: expense === "income",
							newData: formData?.details,
						})
					}
				>
					Save
				</button>
			</div>
		</div>
	);
}
