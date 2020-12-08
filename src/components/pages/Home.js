import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import Admin from '../auth/Admin';
import Login from "../auth/Login";

export default function Home() {
  const { userData } = useContext(UserContext);

  if(!userData.user)
    return <Login/>
  if(userData.user.role === "admin")
    return <Admin/>
  if(userData.user)
    return <h1>Welcome {userData.user.displayName} to the Home page </h1>
}
