import React, { useEffect } from 'react';
import styles from './Login.module.css';
import Header from '../Components/Header';
import svg from './google.svg';

function Login() {
  const google = () => {
    // Open the Google OAuth URL in a new window
    const authWindow = window.open("https://keeper-api-3hra.onrender.com/auth/google", "_blank");

    // Listen for changes in the new window's location
    const checkAuthStatus = setInterval(() => {
      if (authWindow && authWindow.location.pathname === '/app') {
        // Authentication succeeded, close the window and redirect to /app
        authWindow.close();
        window.location.href = '/app';
        clearInterval(checkAuthStatus);
      } else if (authWindow && authWindow.location.pathname === '/login/failed') {
        // Authentication failed, close the window
        authWindow.close();
        clearInterval(checkAuthStatus);
      }
    }, 1000); // Check every second

    // Close the interval when the component unmounts
    return () => {
      clearInterval(checkAuthStatus);
    };
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
