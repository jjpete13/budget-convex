import {  useState } from 'react';
import './cardWithTabs.css';
import data from '../../mock/yearly2024.json'
import SummaryTable from './SummaryTable';
import ExpenseForm from './ExpenseForm';

const testData: Data = {
  '2024': {
    months: data['2024'].months,
    income: data['2024'].income,
    expenses: data['2024'].expenses
  }
}

export interface MonthIncome {
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

export type MonthData = {income: MonthIncome, expenses: MonthExpense}

function getCurrentData({data, month}: {data: Data, month: string}) {
  let summary: MonthData = {income: {value: 0, details: []}, expenses: {value: 0, details: []}}
  summary.income = data.income ? data.income[month] : {details: [], value: 0};
  summary.expenses = data.expenses ? data .expenses[month] : {details: [], value: 0};;
  return summary
}

export default function CardWithTabs(props: any) {
  const {data} = props
  const tabs = [...data.months]
  const [month, setMonth] = useState(tabs[0])
  const [currentTab, setCurrentTab] = useState('summary')
  const [currentData, setCurrentData] = useState(getCurrentData({data, month}))
  const items = ['summary', 'income', ...currentData.expenses.details.map((item: expense) => item.name)]


  const handleMonthChange = (e: any) => {
    setMonth(e.target.value)
    setCurrentData(getCurrentData({data, month: e.target.value}))
    setCurrentTab('summary')
  }

  return (
    <div className="card">
      {NavBar({tabs, month, handleMonthChange})}
      <div className='card-body'>
      <select name="tableItems" id="tableItems" onChange={(e) => setCurrentTab(e.target.value)} value={currentTab}>
        {items.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
       {currentData && currentTab === 'summary' ? (<SummaryTable currentData={currentData} />) : (<ExpenseForm data={currentData} expense={currentTab} />)}
      </div>
      
    </div>
  )
}