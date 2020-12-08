import React, { Component } from 'react'
import {useState} from 'react';
import {useContext} from 'react';
import Axios from "axios";
//import UserContext from "../../context/UserContext";
import Login from "../auth/Login";
import UserContext from "../../context/UserContext";
export default function Teams(){
   
   const { userData } = useContext(UserContext);
   const token = userData.token;
   const [teams, setTeams] = useState();
   console.log(token)
   //if no user data then login, if logged in but not admin role, print not an admin
   //if admin print welcome to admin page future admin stuf
   var test = async(e) => {

       const list = await Axios.get(process.env.REACT_APP_URL+"/users/UserList",{ headers: {"x-auth-token" :token }});
      var a =Object.values(list.data);
            const renderList = a.map(user => <div key={user["_id"]}>_id: {user["_id"]} name: {user["displayName"]} email: {user["email"]} teamName:{user["teamNumber"]}</div>);
            console.log(renderList)
            var thisTeam = [];
            var teamNum;
            for(var i = 0; i < renderList.length; i++)
            {
                 if(renderList[i].props.children[1].localeCompare(userData.user.id) === 0)
                 {
                     teamNum = renderList[i].props.children[7]
                 }
            }
            for(var j = 0; j < renderList.length; j++)
            {
                if(renderList[j].props.children[7] == teamNum)
                {
                    thisTeam.push(renderList[j])
                }
            }
            setTeams(thisTeam)
            return result;
   }
   var result = function(d)
   {
       console.log(d)
       if(!d){return <tr></tr>}
        var r = []
        console.log(d)
        for(var k = 0; k < d.length; k++)
        {
            r[k] = <tr>
            <td>{d[k].props.children[3]}</td>
            <td>{d[k].props.children[5]}</td>
            <td>{d[k].props.children[7]}</td>
            </tr>   
        }
       return r
   }
   //I dont think there is a need for findTeam(student) the way it is now
   if(!userData.user)
       return <Login/>
   return (
       <div>
           <h2>Team info page</h2>
           <h2><button onClick= {test}>see all users</button></h2>
           <div>{console.log(teams)}</div>
           <table id="student-info">
               <thead>
                   <tr>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Team Number</th>
                   </tr>
               </thead>
               <tbody>{result(teams)}</tbody>
           </table>
       </div>
   )
}
