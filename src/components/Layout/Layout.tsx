"use client"
import {FC} from 'react';
import styles from './Layout.module.css'
import {usePathname, useRouter} from "next/navigation";



const Layout: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
      <div className={styles.container}>
        <div className={styles.box}>
        <span
            onClick={() => handleNavigation('/FrontProject')}
            className={pathname === '/FrontProject' ? styles.active : ''}
        >
          Main page
        </span>
          <span
              onClick={() => handleNavigation('/FrontProject/assignments')}
              className={pathname === '/FrontProject/assignments' ? styles.active : ''}
          >
          Assignments
        </span>
          <span
              onClick={() => handleNavigation('/FrontProject/classes')}
              className={pathname === '/FrontProject/classes' ? styles.active : ''}
          >
          Classes
        </span>
          <span
              onClick={() => handleNavigation('/FrontProject/login')}
              className={pathname === '/FrontProject/login' ? styles.active : ''}
          >
          Log in
        </span>
        </div>
      </div>
  );
};

export default Layout;