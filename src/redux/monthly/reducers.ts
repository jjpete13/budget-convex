import {
	GET_MONTHLY_BUDGET,
	UPDATE_EXPENSE,
	UPDATE_INCOME,
	UPDATE_MONTHLY_BUDGET,
} from "./actions";

const initialState = {
	budget: {},
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().toLocaleString("default", { month: "long" }),
};

const updateExpenseReducer = (state: any, action: any) => {
	const {
		month,
		expense,
		value,
	}: {
		month: string;
		expense: string;
		value: { name: string; value: number }[];
	} = action.payload;
	return {
		...state,
		budget: {
			...state.budget,
			expenses: {
				...state.budget.expenses,
				[month]: {
					...state.budget.expenses[month],
					details: state.budget.expenses[month].details.map((item: any) =>
						item.name === expense
							? {
									...item,
									details: value,
									value: value.reduce(
										(acc: number, item: any) => acc + item.value,
										0,
									),
								}
							: item,
					),
					value: state.budget.expenses[month].details.reduce(
						(acc: number, item: any) =>
							acc +
							(item.name === expense
								? value.reduce((sum: number, item: any) => sum + item.value, 0)
								: item.value),
						0,
					),
				},
			},
		},
	};
};

const updateIncomeReducer = (state: any, action: any) => {
	const {
		month,
		value,
	}: { month: string; value: { name: string; value: number }[] } =
		action.payload;
	return {
		...state,
		budget: {
			...state.budget,
			income: {
				...state.budget.income,
				[month]: {
					details: value,
					value: value.reduce((acc: number, item: any) => acc + item.value, 0),
				},
			},
		},
	};
};

export const monthlyReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case GET_MONTHLY_BUDGET:
			return { ...state, budget: action.payload };
		case UPDATE_MONTHLY_BUDGET:
			return { ...state, budget: action.payload };
		case UPDATE_EXPENSE:
			return updateExpenseReducer(state, action);
		case UPDATE_INCOME:
			return updateIncomeReducer(state, action);
		default:
			return state;
	}
};
