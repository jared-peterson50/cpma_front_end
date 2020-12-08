import React, { useContext } from 'react'
import UserContext from "../../context/UserContext";
import Login from "../auth/Login";
import Axios from 'axios';
import ReactFileReader from 'react-file-reader';


export default function Coffee1() {
    const { userData } = useContext(UserContext);
    const token = userData.token;
    const handleFiles = files => {
        console.log("here");
        var result = [0,0,0,0,0,0,0,0,0,0]
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            alert(reader.result)
            result = reader.result.split('\n')
            for(var iter = 0; iter < result.length; iter++)
            {
                result[iter] = Number(result[iter]);
            }
            console.log(result)
        }
        reader.readAsText(files[0]);
        console.log(reader.result);
        var table = document.getElementById('table')
        var myhtml = '<table id = "table">';
        for(let i = 1; i <= 10; i++)
        {
            myhtml += "<tr id = 'coffee" + i + "'>"
            myhtml += '<td>Coffee ' + i + '</td>'
            myhtml += '<td contenteditable = "true">' + result[i - 1] + '</td></tr>'
        }
        myhtml += '</table>'
        table.innerHTML = myhtml;
    }
    if(!userData.user)
        return <Login/>
    return (
        <div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.js"></script>
            <h1>Welcome {userData.user.displayName} to the coffee page </h1>
            <iframe id= "test" frameborder="0" width="75%" height="500px" src="https://repl.it/@AlecDonovan1/CPMATemplate?lite=true" frameborder="200" margin = "-100px"></iframe>
            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
            <button>Upload</button>
          </ReactFileReader>
          <table id = "table">
          </table>
        </div>
    )
}

