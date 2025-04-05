export const GET_MONTHLY_BUDGET = 'GET_MONTHLY_BUDGET';
export const UPDATE_MONTHLY_BUDGET = 'UPDATE_MONTHLY_BUDGET';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const UPDATE_INCOME = 'UPDATE_INCOME';

export const getMonthlyBudget = (data: {}) => ({
  type: GET_MONTHLY_BUDGET,
  payload: data
});

export const updateMonthlyBudget = (data: {}) => ({
  type: UPDATE_MONTHLY_BUDGET,
  payload: data
});

export const updateExpense = (data: {}) => ({
  type: UPDATE_EXPENSE,
  payload: data
});

export const updateIncome = (data: {}) => ({
  type: UPDATE_INCOME,
  payload: data
});