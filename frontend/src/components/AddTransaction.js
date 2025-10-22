import React, { useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'; 

export const AddTransaction = () => {
    const [text, setText] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [category, setCategory] = React.useState('Food');

    const { addTransaction } = useContext(GlobalContext);

    const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Healthcare', 'Education', 'Other'];

    const onSubmit = e => {
        e.preventDefault();

        if (!text.trim() || amount === 0) {
            alert('Please enter a description and amount');
            return;
        }

        const newTransaction = {
            text,
            amount: +amount,
            category: amount < 0 ? category : 'Income',
            date: new Date().toISOString()
        }

        addTransaction(newTransaction);
        setText('');
        setAmount(0);
        setCategory('Food');
    }

  return (
    <>
        <h3>➕ Add New Transaction</h3>
        <form id="form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="text">Description</label>
                <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder="e.g., Grocery shopping, Salary..." 
                    required
                />
            </div>
            <div className="form-control">
                <label htmlFor="amount">
                    Amount
                </label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder="Negative for expense, positive for income" 
                    required
                />
                <small style={{color: '#888', fontSize: '12px', marginTop: '5px', display: 'block'}}>
                    Use negative numbers for expenses and positive for income
                </small>
            </div>
            {amount < 0 && (
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="category-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            )}
            <button className="btn">Add Transaction</button>
        </form>
    </>
  )
}
