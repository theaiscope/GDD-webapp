import React, {ReactElement} from 'react'

import { SignOut } from "../Auth";

export const Dashboard = (): ReactElement =>
  <div>
    <p>Dashboard</p>
    <SignOut />
  </div>