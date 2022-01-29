import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import styles from "./Login.module.css"

export const LogIn = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    signInWithEmailAndPassword,
    user,
    loading,
  ] = useSignInWithEmailAndPassword(config);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      //TODO: write test for redirecting to location.state.from.pathname
      const state = location.state as { from: Location };
      const from = state ? state.from.pathname : '/dashboard';
      navigate(from)
    }
  }, [user, loading]);


  return <div className={styles.container}>
    <h2 className={styles.header}>Login</h2>
    <input
      type="text"
      className={`${styles.input} ${styles.formItem}`}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="email"
    />
    <input
      type="password"
      className={`${styles.input} ${styles.formItem}`}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="password"
    />
    <button
      className={`${styles.loginButton} ${styles.formItem}`}
      onClick={() => signInWithEmailAndPassword(email, password)}
    >
      LOGIN
    </button>
  </div>
}
