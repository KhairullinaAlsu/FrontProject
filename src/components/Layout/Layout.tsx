"use client"
import {FC} from 'react';
import styles from './Layout.module.css'
import {usePathname} from "next/navigation";



const Layout: FC = () => {
  const pathname = usePathname();


  return (
      <div className={styles.container}>
        <div className={styles.box}>
        <a
            href="/FrontProject"
            className={pathname === '/FrontProject' ? styles.active : ''}
        >
          Main page
        </a>
          <a
              href="/FrontProject/assignments"
              className={pathname === '/FrontProject/assignments' ? styles.active : ''}
          >
          Assignments
        </a>
          <a
              href="/FrontProject/classes"
              className={pathname === '/FrontProject/classes' ? styles.active : ''}
          >
          Classes
        </a>
          <a
              href="/FrontProject/login"
              className={pathname === '/FrontProject/login' ? styles.active : ''}
          >
          Log in
        </a>
        </div>
      </div>
  );
};

export default Layout;