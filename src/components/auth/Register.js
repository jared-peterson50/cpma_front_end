import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [teamName, setTeamName] = useState();
  const [teamNumber, setTeamNumber] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName, teamName, teamNumber};
      console.log("team number: " + newUser.teamNumber);
      await Axios.post(process.env.REACT_APP_URL+"/users/register", newUser);
      const loginRes = await Axios.post(process.env.REACT_APP_URL+"/users/login", {email,password});
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label htmlFor="register-display-name">Display name</label>
        <input
          id="register-display-name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <label htmlFor="register-team-name">Team name</label>
        <input
          id="register-team-name"
          type="text"
          onChange={(e) => setTeamName(e.target.value)}
        />
        <label htmlFor="register-team-number">Team number</label>
        <input
          id="register-team-number"
          type="text"
          onChange={(e) => setTeamNumber(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
