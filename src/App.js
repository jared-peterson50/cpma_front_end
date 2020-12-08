import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import Admin from './components/auth/Admin';
import ScoreBoard from './components/pages/ScoreBoard';
import Coffee from './components/pages/Coffee';
import Coffee1 from './components/pages/Coffee';
import Team from './components/pages/Team';
import Student from './components/pages/Student';
import "./style.css";
/*
this is the entrace to the application we are using a functional component and initializing
the userData object token, user, and role.  Then in the useEffect we are checking the auth-token
the first time the user goes to the page the auth-token is null so check that, set it to empty string

*/
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    role: '2',
  });
  
  //we set the auth token to the empty string if empty so we dont raise an exeption
  useEffect(() => {
    document.title = "ASU Marketing Coffee Shop"
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      /*
      we are checking if the token is valid sending the token value in the header. The
      response is stored in tokenRes.data as a boolean value either true or false.
      */

      const tokenRes = await Axios.post(process.env.REACT_APP_URL+"/users/tokenIsValid",
        null,{ headers: { "x-auth-token": token }});
      
      /*
      if we have a valid token then allow the api call getting the users JSON data and
      storing it in userRes
      */
      console.log("token: ", token)
      if (tokenRes.data) {
        //trying null
        const userRes = await Axios.get(process.env.REACT_APP_URL+"/users/",{
          headers: { "x-auth-token": token }});
          console.log("userRES!!!", userRes)
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/admin" component={Admin} />
              <Route path ="/scoreboard" component={ScoreBoard}/>
              <Route path="/team" component={Team} />
              <Route path="/coffee" component={Coffee} />
              <Route path="/coffee" component={Coffee1} />
              <Route path="/student" component={Student} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
