// components/Navbar.js

import Link from 'next/link';
import styles from './navbar.module.css'; // If you're using CSS modules

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navlink} href="/">
        Dashboard
      </Link>
      <Link className={styles.navlink} href="/create-account">
        Expenses
      </Link>
      <Link className={styles.navlink} href="/reports">
        Reports
      </Link>
      {/* Add more links as needed */}
    </nav>
  );
};

export default Navbar;
