import React, { useContext } from 'react';
import Login from "../auth/Login";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';

export default function Admin() {
    const { userData } = useContext(UserContext);
    const token = userData.token;
    const [users, setUsers] = useState();
    //testing github repo
    const setPeriod = async (e) => {
      e.preventDefault();
      try {
        var x = document.getElementById("textBoxPeriod").value; 
        const send = {period: x};
        const res = await Axios.post(process.env.REACT_APP_URL+"/users/periodset",send);  
        console.log(res);
      }
      catch(err){
        console.log("error in the delete user: " + err);
      }
    }




    const delUser = async (e) => {
      e.preventDefault();
      try {
        var x = document.getElementById("textBoxDel").value;       
        var axiosConfig = { headers: {"x-auth-token" :token, "user": x}}
        await Axios.delete(process.env.REACT_APP_URL+"/users/delete",axiosConfig);  
      }
      catch(err){
        console.log("error in the delete user: " + err);
      }
    }
    const submit = async (e) => {
        e.preventDefault();
        try {
          const list = await Axios.get(process.env.REACT_APP_URL+"/users/UserList",{ headers: {"x-auth-token" :token }});
          
          //we need to convert the json object to an array so we can use the map function
          try{
            var a =Object.values(list.data);
            const renderList = a.map(user => <div key={user["_id"]}>_id: {user["_id"]} name: {user["displayName"]} email: {user["email"]} teamName:{user["teamNumber"]}</div>);
            setUsers(renderList);
          }
          catch(err){
            console.log("error happend generating user list: " + err);
          }
        }
          catch (err) {
            console.log(err.response.data.msg);
          }
        };


    //below is all of the upload functions
      const [file, setFile] = useState('');
      const [filename, setFilename] = useState('Choose File');
      const [uploadedFile, setUploadedFile] = useState({});
      const [message, setMessage] = useState('');
      const [uploadPercentage, setUploadPercentage] = useState(0);
    
      const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
      };
    
      const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
          const res = await Axios.post(process.env.REACT_APP_URL+"/users/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
              setUploadPercentage(
                parseInt(
                  Math.round((progressEvent.loaded * 100) / progressEvent.total)
                )
              );
    
              // Clear percentage
              setTimeout(() => setUploadPercentage(0), 10000);
            }
          });
          const { fileName, filePath } = res.data;
    
          setUploadedFile({ fileName, filePath });
    
          setMessage('File Uploaded');
        } catch (err) {
          if (err.response.status === 500) {
            setMessage('There was a problem with the server');
          } else {
            setMessage(err.response.data.msg);
          }
        }
      };
    

    //if no user data then login, if logged in but not admin role, print not an admin
    //if admin print welcome to admin page future admin stuff
    //<div>{users}</div>
    if(!userData.user)
        return <Login/>
    if(userData.user.role === "admin")
    return (<div>Welcome to the Admin page
      <h2>Set current period 
      <input type="text" id="textBoxPeriod"/>
      <button onClick = {setPeriod}>Set Period</button>
      </h2>
      <h2><button onClick= {submit}>see all users</button></h2>
      <br></br><br></br>
      <div>{users}</div>
        <div> to delete a user, paste _id of user
          <input type="text" id="textBoxDel"/>
          <button onClick = {delUser}>Submit</button>
        </div>
        <br></br><br></br>
        <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
        
      </div>
      )

    if(userData.user)
        return  <h2>not an admin </h2> 
}