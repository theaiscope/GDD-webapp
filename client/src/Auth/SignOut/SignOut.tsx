import React, {ReactElement} from 'react'
import {signOut} from "firebase/auth";
import {config} from "../config";

export const SignOut = (): ReactElement =>
  <>
    <button
      onClick={() => signOut(config)}
    >
      Logout
    </button>
  </>