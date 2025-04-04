import type { MonthData } from "./MonthlyBudgetCard";
import './monthlyBudget.css'

export default function SummaryTable({currentData}: {currentData: MonthData}) {

  return (
    <table className="summary-table">
      <tbody >
      <tr>
        <td>Income</td>
        <td className="value">{currentData?.income.value}</td>
      </tr>
      {(currentData?.expenses?.details || []).map(item => (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td className="value" >{item.value}</td>
        </tr>
      ))}
      <tr style={{fontWeight: 'bold'}}>
        <td>Total Expenses</td>
        <td className="value">{(currentData?.expenses?.details || []).reduce((acc, item) => acc + item.value, 0)}</td>
      </tr>
      <tr style={{fontWeight: 'bold'}}>
        <td>Balance</td>
        <td className="value">{currentData?.income.value - (currentData?.expenses?.details || []).reduce((acc, item) => acc + item.value, 0)}</td>
      </tr>
      </tbody>
    </table>
  )
}
