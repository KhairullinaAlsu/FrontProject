import {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import styles from "./MainPage.module.css"
import Link from "next/link";

interface MainPageProps {
  children?: ReactNode;
};

const MainPage: FC<MainPageProps> = ({children}: MainPageProps) => {
  console.log('Render MainPage');


  return (
      <div className={styles.container}>
        <span className={styles.header}>Class and assignment management</span>
        <span className={styles.text}>On this site you can log in and track your class schedule, add, edit tasks that are given to you during your studies</span>
        <Link href={"/auth"}>
          <button className={styles.button}>Sign in</button>
        </Link>
      </div>
  );
};

MainPage.propTypes = {
  children: PropTypes.element,
};

export default MainPage;