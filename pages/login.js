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
      // Need to change login to return data about user
      // So I can set userId: response.userId to retrieve users expenses
      const response = await axios.post('http://localhost:8080/api/users/login', formData);
      console.log('User: ', response);
      setUser({ username: formData.username, userId: response.data });
      localStorage.setItem('authToken', response.data.token);
      setLoading(false);
      router.push('/home');
    } catch (err) {
      setLoading(false);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mb-2 px-2 py-1 border rounded"
          />
          <br></br>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mb-2 px-2 py-1 border rounded"
          />
          <br></br>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <br></br>
          <Link href="/create-account">Create an account</Link>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
