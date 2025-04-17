export const GET_MONTHLY_BUDGET = "GET_MONTHLY_BUDGET";
export const UPDATE_MONTHLY_BUDGET = "UPDATE_MONTHLY_BUDGET";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const UPDATE_INCOME = "UPDATE_INCOME";

export const getMonthlyBudget = (data: Record<string, unknown>) => ({
	type: GET_MONTHLY_BUDGET,
	payload: data,
});

export const updateMonthlyBudget = (data: Record<string, unknown>) => ({
	type: UPDATE_MONTHLY_BUDGET,
	payload: data,
});

export const updateExpense = (data: Record<string, unknown>) => ({
	type: UPDATE_EXPENSE,
	payload: data,
});

export const updateIncome = (data: Record<string, unknown>) => ({
	type: UPDATE_INCOME,
	payload: data,
});
