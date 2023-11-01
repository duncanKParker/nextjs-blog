import React from 'react';
import withAuth from '../lib/withAuth';
import { useUser } from './UserContext';
import Graph from '../components/graph'
import ExpensesList from '../components/expenseslist';

function Home() {
    const { user } = useUser();
    const expenses = ['Groceries', 'Rent', 'Utilities', 'Entertainment'];

    return (
    <div>
        <div>Welcome, {user ? user.username : 'Guest'}!</div>
        <div>
            <section>
            <h1>Graph</h1>
            <Graph />
            </section>

            <section>
            <ExpensesList expenses={expenses} />
            </section>
        </div>
    </div>
    );
}

export default withAuth(Home);
