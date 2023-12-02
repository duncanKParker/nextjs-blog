import React, { useEffect, useState } from 'react';
import withAuth from '../lib/withAuth';
import { useUser } from './UserContext';
import Graph from '../components/graph'
import ExpensesList from '../components/expenseslist';
import Navbar from '../components/navbar';
import styles from '../styles/utils.module.css';
import axios from 'axios';

function Home() {
    const { user } = useUser();
    const [expenses, setExpenses] = useState([]);
    const addExpense = newExpense => {
        setExpenses([...expenses, newExpense]);
    };
    const [error, setError] = useState('');

    const retrieveExpenses = async () => {
        try {
            console.log('RetrieveExpenses hit');
            console.log('User id: ' + user.userId);
            const response = await axios.get(`http://localhost:8080/api/expense/${user.userId}`);
            console.log('Response: ' + response);
            setExpenses(response.data);
          } catch (err) {
            setError('Failure to retrieve expenses');
          }
    }

    
    useEffect(() => {
        retrieveExpenses();
    }, []); // The empty array ensures this effect runs only once after initial render


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
            <ExpensesList expenses={expenses} onAddExpense={addExpense} />
            </section>
        </div>
    </div>
    );
}

export default withAuth(Home);
