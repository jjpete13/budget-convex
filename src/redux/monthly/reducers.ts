import { GET_MONTHLY_BUDGET, UPDATE_MONTHLY_BUDGET} from "./actions";

const initialState = {
  budget: {},
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().toLocaleString('default', { month: 'long' }),
}

export const monthlyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_MONTHLY_BUDGET:
      return {...state, budget: action.payload, }
    case UPDATE_MONTHLY_BUDGET:
      return {...state, budget: action.payload}
    default:
      return state
  }
}