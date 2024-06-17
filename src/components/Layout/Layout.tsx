import {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css'

interface LayoutProps {
  children?: ReactNode;
};

const Layout: FC<LayoutProps> = ({children}: LayoutProps) => {
  console.log('Render Layout');

  return (
      <div className={styles.container}>
        <div className={styles.box}>
          <a href="/" className="main">Main page</a>
          <a href="#" className="assignments">Assigments</a>
          <a href="#" className="classes">Classes</a>
          <a href="/auth" className="log_in">Log in</a>
        </div>
      </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;