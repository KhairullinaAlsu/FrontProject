"use client"
import {FC, useEffect} from 'react';
import styles from './Layout.module.css'



const Layout: FC = () => {
  useEffect(() => {
    const links = document.querySelectorAll(`.${styles.box} a`);
    const currentPath = window.location.pathname;

    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add(styles.active);
      }
    });
  }, []);

  return (
      <div className={styles.container}>
        <div className={styles.box}>
          <a href="/" className="main">Main page</a>
          <a href="/assignments" className="assignments">Assignments</a>
          <a href="/classes" className="classes">Classes</a>
          <a href="/login" className="log_in">Log in</a>
        </div>
      </div>
  );
};

export default Layout;