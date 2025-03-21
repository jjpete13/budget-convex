// @ts-nocheck
import { useState } from 'react';
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
    expenses: Record<string, MonthExpense>
  }
}

interface expense {
  name: string;
  value: number;
}

const navBar = ({tabs, month, handleMonthChange}: {tabs: string[], month: string, handleMonthChange: (e: any) => void}) => {
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
function getCurrentData(month: string, year: string) {
  const monthKey = testData[year].months[testData[year].months.indexOf(month)]
  let summary: MonthData = {income: {value: 0, details: []}, expenses: {value: 0, details: []}}
  summary.income = testData[year].income[monthKey]
  summary.expenses = testData[year].expenses[monthKey]
  return summary
}

export default function CardWithTabs() {
  const tabs = [...testData['2024'].months]
  const [month, setMonth] = useState(tabs[0])
  const [currentTab, setCurrentTab] = useState('summary')
  const [currentData, setCurrentData] = useState(getCurrentData(month, '2024'))
  const items = ['summary', 'income', ...currentData.expenses.details.map((item: expense) => item.name)]


  const handleMonthChange = (e: any) => {
    setMonth(e.target.value)
    setCurrentData(getCurrentData(e.target.value, '2024'))
    setCurrentTab('summary')
  }

  return (
    <div className="card">
      {navBar({tabs, month, handleMonthChange})}
      <div className='card-body'>
      <select name="tableItems" id="tableItems" onChange={(e) => setCurrentTab(e.target.value)} value={currentTab}>
        {items.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
       {currentData && currentTab === 'summary' ? (<SummaryTable currentData={currentData} />) : (<ExpenseForm data={currentData} expense={currentTab} />)}
      </div>
      
    </div>
  )
}