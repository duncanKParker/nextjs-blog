import React from 'react';
import withAuth from '../lib/withAuth';
import { useUser } from './UserContext';
import Graph from '../components/graph'
import ExpensesList from '../components/expenseslist';
import Navbar from '../components/navbar';
import styles from '../styles/utils.module.css';

function Home() {
    const { user } = useUser();
    const expenses = ['Groceries', 'Rent', 'Utilities', 'Entertainment'];

    return (
    <div className={styles.container}>
        <Navbar />
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
