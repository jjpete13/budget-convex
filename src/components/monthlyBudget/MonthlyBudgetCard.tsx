import {  useState } from 'react';
import './monthlyBudget.css';
import SummaryTable from './SummaryTable';
import ExpenseForm from './ExpenseForm';
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from '../toast/toastObserver';

 interface MonthIncome {
      value: number,
      details: {name: string, value: number}[]
  }
  interface MonthExpense {
    value: number,
    details: {name: string, value: number, details: {name: string, value: number}[]}[]
  }

interface Data {
  [year: string]: {
    months: string[],
    income: Record<string, MonthIncome>,
    expenses: Record<string, MonthExpense>,
    [key: string]: any
  }
}

interface expense {
  name: string;
  value: number;
}

export type MonthData = {income: MonthIncome, expenses: MonthExpense}

const NavBar = ({tabs, month, handleMonthChange}: {tabs: string[], month: string, handleMonthChange: (e: any) => void}) => {
  return (
    <div className='card-tabs'>
      {tabs.map((tab) => {
         return (
          <button className={month === tab ? "active" : ""} onClick={(e) => handleMonthChange(e)} key={tab} value={tab}>{tab}</button>
        )

      })}
    </div>
  )
}

function getCurrentData({data, month}: {data: Data, month: string}) {
  let summary: MonthData = {income: {value: 0, details: []}, expenses: {value: 0, details: []}}
  summary.income = data.income ? data.income[month] : {details: [], value: 0};
  summary.expenses = data.expenses ? data .expenses[month] : {details: [], value: 0};;
  return summary
}

export default function MonthlyBudgetCard(props: any) {
  const {data, currentMonth, currentYear} = props
  const tabs = [...data.months]
  const [month, setMonth] = useState(currentMonth)
  const [currentTab, setCurrentTab] = useState('summary')
  const [currentData, setCurrentData] = useState(getCurrentData({data, month}))
  const items = ['summary', 'income', ...currentData.expenses.details.map((item: expense) => item.name)]
  const update = useMutation(api.yearlyData.updateBudgetData);
  const user = sessionStorage.getItem('user') || "";

  const handleMonthChange = (e: any) => {
    setMonth(e.target.value)
    setCurrentData(getCurrentData({data, month: e.target.value}))
    setCurrentTab('summary')
  }

  const updateFormData = ({isIncome, newData}: {isIncome: boolean, newData: any}) => {
    const lastItemFilled = newData.details.filter((item: any) => item.name !== '' && item.value !== 0).length === newData.details.length
    if (!lastItemFilled) return toast.error('Please fill in all the fields');
    const type = isIncome ? 'income' : 'expenses'
    const updates = {[currentTab]: newData}
    const reqData = {...data};
    reqData[type][month].details.map((item: any, index: number) => item.name === currentTab && (reqData[type][month].details[index] = newData))
    console.log(reqData);
    // update({user_id: user, year: currentYear, newData, isExpense: isIncome})
  }

  return (
    <div className="card">
      {NavBar({tabs, month, handleMonthChange})}
      <div className='card-body'>
      <select name="tableItems" id="tableItems" onChange={(e) => setCurrentTab(e.target.value)} value={currentTab}>
        {items.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
       {currentData && currentTab === 'summary' ? (<SummaryTable currentData={currentData} />) : (<ExpenseForm data={currentData} expense={currentTab} updateFormData={updateFormData} />)}
      </div>
      
    </div>
  )
}