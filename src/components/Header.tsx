import React from 'react';
import img from '../sprites/bean.png';
import styles from './Header.module.css';

const Header = ({
  toggleView,
  isHistory,
}: {
  toggleView: () => void;
  isHistory: boolean;
}) => (
  <header className={styles.header}>
    <img src={img} alt="beans" className={styles.beans} />
    <button onClick={toggleView}>{isHistory ? 'hide ' : 'Show '}History</button>
  </header>
);

export default Header;
