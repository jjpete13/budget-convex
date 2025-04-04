import { useEffect,  useRef,  useState } from "react";
import './monthlyBudget.css'
import type { MonthData } from "./MonthlyBudgetCard";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const ExpenseRow = ({index, name, value, handleChange}: {index: number, name: string, value: number, handleChange: (index: number, field: "name" | "value", value: string | number) => void}) => {
  const nameRef = useRef<string>("");
  const valueRef = useRef<number>(0);
  return (
    <div className="item" key={index} style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>  
      <input type="text" defaultValue={name} onChange={(e) => nameRef.current = e.target.value} onBlur={() => handleChange(index, 'name', nameRef.current)}/>
      <input type="number" defaultValue={value} onChange={(e) => valueRef.current = Number(e.target.value)} onBlur={() => handleChange(index, 'value', valueRef.current)} />  
    </div>
  )
}

export default function ExpenseForm({data, expense, updateFormData}: {data: MonthData, expense: string, updateFormData: ({isIncome, newData}: {isIncome: boolean, newData: any}) => void}) {
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

  const handleUpdate = (index: number, field: "name" | "value", value: string | number) => {
    setFormData(prev => prev ? {...prev, details: prev.details.map((item, i) => i === index ? {...item, [field]: value} : item)} : formData)
  }


  return (
    <div className="expense-form">
      {formData && (
        <>
          <div className="total">
            <h2>{expense}</h2>
            <h2>{formData.value}</h2>
          </div>
          {(formData?.details || []).map((item, index) => (
            <ExpenseRow key={`${item.name}-${index}`} index={index} name={item.name} value={item.value} handleChange={handleUpdate} />
          ))}
        </>
      )}
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '1em'}}>
      <button onClick={handleAddRow} style={{marginLeft: '1em'}}>+</button>
        <button style={{marginLeft: 'auto'}} onClick={handleCancel}>Cancel</button>
        <button type="submit" style={{marginRight: '1em'}} onClick={() => updateFormData({isIncome: expense === 'income', newData: formData})}>Save</button>
      </div>
    </div>
  );
}
