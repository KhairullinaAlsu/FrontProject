import {FC} from 'react';
import styles from './Layout.module.css'



const Layout: FC = () => {
  console.log('Render Layout');

  return (
      <div className={styles.container}>
        <div className={styles.box}>
          <a href="/FrontProject" className="main">Main page</a>
          <a href="#" className="assignments">Assigments</a>
          <a href="#" className="classes">Classes</a>
          <a href="/FrontProject/auth" className="log_in">Log in</a>
        </div>
      </div>
  );
};

export default Layout;