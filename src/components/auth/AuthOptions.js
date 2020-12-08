import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();
  const admin = () => history.push("/admin");
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const team = () => history.push("/team");
  const scoreboard = () => history.push("/scoreboard");
  const coffee = () => history.push("/coffee");
  const student =() => history.push("/student");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    
  };
//if the user is logged in render the coffee,teams,scoreboard,logout buttons
//else render login, admin, register buttons
  return (
    <nav className="auth-options">
      {userData.user ? (<> 
      <button onClick={coffee}>Coffee</button> 
      <button onClick={team}>Teams</button>
      <button onClick={scoreboard}>Scoreboard</button>
      <button onClick={student}>Student</button>
      <button onClick={admin}>Admin</button>
      <button onClick={logout}>Log out</button>
      </>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
          
        </>
      )}
    </nav>
  );
}
