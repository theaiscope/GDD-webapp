import React, {ReactElement, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { config } from "./config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export const SignIn = (): ReactElement => {
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
      // maybe trigger a loading screen
      return;
    }
    if (user) {
      const state = location.state as { from: Location };
      const from = state ? state.from.pathname : '/';
      navigate(from)
    }
  }, [user, loading]);


  return <div>
    <h3>Login</h3>
    <input
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="email"
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="password"
    />
    <button
      onClick={() => signInWithEmailAndPassword(email, password)}
    >
      LOGIN
    </button>
  </div>
}
