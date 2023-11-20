// pages/create-account.js
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log(JSON.stringify(formData));
    
        try {
          const response = await axios.post('http://localhost:8080/api/users/create', formData);
          console.log(response);
          setLoading(false);
          router.push('/login');
        } catch (error) {
          setLoading(false);
          setError('Creation failed');
        }
      };

  return (
    <div className={utilStyles.container}>
      <Head>
        <title>Create Account</title>
      </Head>
      <div>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            />
            <br></br>
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            />
            <br></br>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Create Account'}
            </button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Already have an account? 
          <Link href="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
