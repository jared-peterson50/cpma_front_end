import React from 'react'
import {useContext} from 'react';
import UserContext from "../../context/UserContext";
import Login from "../auth/Login";
import {Line} from 'react-chartjs-2';
import Axios from 'axios';
import {useState} from 'react';
export default function ScoreBoard() {
  //begin adding
  const [users, setUsers] = useState();
  const [rawUser, setRawUser] = useState();
  const { userData } = useContext(UserContext);
  const token = userData.token;
  const seeList = async (e) => {
    e.preventDefault();
    const list = await Axios.get(process.env.REACT_APP_URL+"/users/UserList",{ headers: {"x-auth-token" :token }});
    var a =Object.values(list.data);
    console.log(a);
    const renderList = a.map(user => <div key={user["_id"]}>_id: {user["_id"]} name: {user["displayName"]} email: {user["email"]} team number:{user["teamNumber"]} totalscore:{user["total_score"]} arr:{user["arr"]}</div>);
    setUsers(renderList);
    setRawUser(a);
    console.log("the total score");
    console.log(a[2].total_score);
    console.log("team1 array");
    console.log(a[1].arr[0]);
    console.log(a[1].arr[1]);
    console.log(a[1].arr[2]);
    console.log(a[1].arr[3]);
    console.log(a[1].arr[4]);
  }
  


  //end adding
    const state = {
        labels: ['Period 0', 'Period 1', 'Period 2',
                 'Period 3', 'Period 4'],
        datasets: [
          {
            label: 'Team 1',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 2,
            //data:
            //data: [65, 59, 80, 81, 56]
          },
          {
            label: 'Team 14',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,255,0,1)',
            borderWidth: 2,
            data: [51, 87, 91, 67, 71]
          },
          {
            label: 'Team 27',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,255,1)',
            borderWidth: 2,
            data: [61, 74, 67, 84, 65]
          }
        ]
      }
    if(!userData.user)
        return <Login/>
    return (
        <div>
            <h1>Welcome {userData.user.displayName} to the scoreboard page </h1>
            <div>
                <Line
                data={state}
                options={{
                    title:{
                    display:true,
                    text:'Scores for Top 3 Teams',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />
            </div>
            <br></br>
            <button onClick = {seeList}>see list</button>
                <div>
                  {users}
                </div>
                <br>
                </br>
            
        </div>
        
    )
}
