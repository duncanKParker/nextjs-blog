import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../pages/UserContext';

export default function ExpensesList({ expenses, onAddExpense }) {

    const { user } = useUser();
    // const [formData, setFormData] = useState({ 
    //   amount: '1.0',
    //   description: '',
    //   userAccount: '1',
    //   expense_category_id: '1',
    //   userAccountId: user.userAccountId,
    //   });
    const [formData, setFormData] = useState({ 
      amount: '1.0',
      description: '',
      userAccountId: user.userId, // Create a userAccount object with just the ID
      categoryId: '1' , // Assuming category works similarly
      expenseDateTime: new Date().toISOString(),
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        console.log('Trying to create new expense');
        console.log('Form Data: ', JSON.stringify(formData));
        console.log('User: ', user);
        const response = await axios.post('http://localhost:8080/api/expense/create', formData);
        onAddExpense(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    return (
      <div>
        <h2>Expenses</h2>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br></br>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Create'}
        </button>
        </form>
        <div>
          {expenses.map((expense, index) => (
              <div style={{ border: '1px solid black' }} key={index}>
                  <p>Amount: {expense.amount}</p>
                  <p>Description: {expense.description}</p>
                  {/* Render other properties as needed */}
              </div>
          ))}
        </div>
      </div>
    );
  }
  