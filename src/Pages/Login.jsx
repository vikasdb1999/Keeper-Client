import React from 'react';
import styles from './Login.module.css';
import Header from '../Components/Header';
import svg from './google.svg'

function Login() {
  const google = () => {
    window.open("https://keeper-api-3hra.onrender.com/auth/google", "_self");
  };
  return (
    <div>
      <Header />
      <div className={styles.signup}>
        <button onClick={google} className={styles.login}>
          <img src={svg} className={styles.googlesvg} alt='' />Login using Google
        </button>
      </div>
    </div>
  );
}

export default Login;
