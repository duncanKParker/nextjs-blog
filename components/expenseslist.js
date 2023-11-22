import { useState } from 'react';
import axios from 'axios';

export default function ExpensesList({ expenses }) {

    const [formData, setFormData] = useState({ 
      amount: '1.0',
      description: '',
      userAccount: '1',
      expense_category_id: '1',
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
        const response = await axios.post('http://localhost:8080/api/expense/create', formData);
        console.log(response);
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
        <ul>
          {expenses.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </div>
    );
  }
  