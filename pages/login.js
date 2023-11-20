import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { useUser } from './UserContext';
import utilStyles from '../styles/utils.module.css';


function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData);
      setUser({ username: formData.username });
      localStorage.setItem('authToken', response.data.token);
      setLoading(false);
      router.push('/home');
    } catch (err) {
      setLoading(false);
      setError('Invalid username or password');
    }
  };

  return (
    <div className={utilStyles.container}>
      <h1>Login</h1>
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
          {loading ? 'Loading...' : 'Login'}
        </button>
        <br></br>
        <Link href="/create-account">Create an account</Link>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
