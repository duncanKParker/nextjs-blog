import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import axios from 'axios';
import Login from './login';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// async function handleSubmit() {
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   try {
//     const response = await axios.post('http://localhost:8080/api/users/login', {
//       username,
//       password
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

export default function Home({ allPostsData }) {
  return (
    <div>
      <Login />
    </div>
  );
}