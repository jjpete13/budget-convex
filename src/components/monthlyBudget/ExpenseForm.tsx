import { useEffect,  useState } from "react";
import './cardWithTabs.css'
import type { MonthData } from "./CardWithTabs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const testExpenseData = 
  {
    April: {
      details: [
        {
          details: [{ name: "rent", value: 1100 }],
          name: "rent",
          value: 1100,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3100,
    },
    August: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    December: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    February: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    January: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    July: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    June: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    March: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    May: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    November: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    October: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
    September: {
      details: [
        {
          details: [{ name: "rent", value: 1000 }],
          name: "rent",
          value: 1000,
        },
        {
          details: [{ name: "groceries1", value: 500 }],
          name: "groceries",
          value: 500,
        },
        {
          details: [{ name: "utilities1", value: 500 }],
          name: "utilities",
          value: 500,
        },
        {
          details: [{ name: "entertainment1", value: 500 }],
          name: "entertainment",
          value: 500,
        },
        {
          details: [{ name: "other1", value: 500 }],
          name: "other",
          value: 500,
        },
      ],
      value: 3000,
    },
  }


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
  const user = sessionStorage.getItem('user')


  useEffect(() => {
    setFormData(expense === 'income' ? data.income : data.expenses.details.find(item => item.name === expense))
  }, [expense])

  const handleAddRow = () => {
    setFormData(prev => prev ? {...prev, value: prev.value, details: [...prev.details, {name: '', value: 0}]} : formData)
  }

  const handleCancel = () => {
    setFormData(expense === 'income' ? data.income : data.expenses?.details.find(item => item.name === expense))
  }

  const TestButton = () => {
    const updateIncome = useMutation(api.yearlyData.updateBudgetData);

    const handleUpdate = async () => {
      if (!user) return
      await updateIncome({
        user_id: user,
        year: 2025,
        newData: testExpenseData,
        isExpense: true
      })
  }
  return (
    <button onClick={handleUpdate}>Update</button>
  )
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
            <ExpenseRow key={`${item.name}-${index}`} index={index} name={item.name} value={item.value} />
          ))}
        </>
      )}
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'start', gap: '1em'}}>
      <button onClick={handleAddRow} style={{marginLeft: '1em'}}>+</button>
        <button style={{marginLeft: 'auto'}} onClick={handleCancel}>Cancel</button>
        <button type="submit" style={{marginRight: '1em'}} onClick={handleCancel}>Save</button>
        <TestButton />
      </div>
    </div>
  );
}
