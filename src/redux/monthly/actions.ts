export const GET_MONTHLY_BUDGET = 'GET_MONTHLY_BUDGET';
export const UPDATE_MONTHLY_BUDGET = 'UPDATE_MONTHLY_BUDGET';

export const getMonthlyBudget = (data: {}) => ({
  type: GET_MONTHLY_BUDGET,
  payload: data
});

export const updateMonthlyBudget = (data: {}) => ({
  type: UPDATE_MONTHLY_BUDGET,
  payload: data
});
