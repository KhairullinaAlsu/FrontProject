import {FC} from 'react';
import styles from "./MainPage.module.css"



const MainPage: FC = () => {
  console.log('Render MainPage');


  return (
      <div className={styles.container}>
        <span className={styles.header}>Class and assignment management</span>
        <span className={styles.text}>On this site you can log in and track your class schedule, add, edit tasks that are given to you during your studies</span>
        <a className={styles.button} href="/login">Sign in</a>
      </div>
  );
};


export default MainPage;