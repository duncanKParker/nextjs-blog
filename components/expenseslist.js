export default function ExpensesList({ expenses }) {
    return (
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>{expense}</li>
          ))}
        </ul>
      </div>
    );
  }
  