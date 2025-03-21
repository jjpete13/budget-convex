import { useEffect,  useState } from "react";
import './cardWithTabs.css'
import type { MonthData } from "./CardWithTabs";


const ExpenseRow = ({index, name, value}: {index: number, name: string, value: number}) => {
  
  return (
    <div className="item" key={index} style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>  
      <input defaultValue={name}  />
      <input defaultValue={value}  />  
    </div>
  )
}

export default function ExpenseForm({data, expense}: {data: MonthData, expense: string}) {
  const [formData, setFormData] = useState(expense === 'income' ? data.income : data.expenses.details.find(item => item.name === expense));



  useEffect(() => {
    setFormData(expense === 'income' ? data.income : data.expenses.details.find(item => item.name === expense))
  }, [expense])

  const handleAddRow = () => {
    setFormData(prev => prev ? {...prev, value: prev.value, details: [...prev.details, {name: '', value: 0}]} : formData)
  }

  const handleCancel = () => {
    setFormData(expense === 'income' ? data.income : data.expenses?.details.find(item => item.name === expense))
  }

  // const handleChange = (e: any) => {
  //   setFormDetails(prev => prev.map((item, i) => {
  //     if (i === parseInt(e.target.parentElement!.getAttribute('key')! || i === formDetails.length - 1)) {
  //       return {...item, [e.target.name]: e.target.value}
  //     }
  //     return item
  //   }))
  // }

  return (
    <div className="expense-form">
      {formData && (
        <>
          <div className="total">
            <h2>{expense}</h2>
            <h2>{formData.value}</h2>
          </div>
          {(formData?.details || []).map((item, index) => (
            <ExpenseRow key={`${item.name}-${index}`} index={index} name={item.name} value={item.value} />
          ))}
        </>
      )}
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '1em'}}>
      <button onClick={handleAddRow} style={{marginLeft: '1em'}}>+</button>
        <button style={{marginLeft: 'auto'}} onClick={handleCancel}>Cancel</button>
        <button type="submit" style={{marginRight: '1em'}} onClick={handleCancel}>Save</button>
      </div>
    </div>
  );
}
