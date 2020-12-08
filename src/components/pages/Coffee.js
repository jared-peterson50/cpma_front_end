import React, { useContext, useState } from 'react'
import UserContext from "../../context/UserContext";
import Login from "../auth/Login";
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import {useForm} from 'react-hook-form';
import {Form, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";


export default function Coffee() {
    const { userData } = useContext(UserContext);
    const token = userData.token;
    const {register, handleSubmit} = useForm();
    const [score, setScore] = useState(0);
    //navigate to coffee1
    const history = useHistory();
    const coffee1 = () => history.push("/coffee1");
    
    const onSubmit = async (data) =>{
      console.log(data);
      const user_id=userData.user.id
      //add id
      const res = await axios.post(process.env.REACT_APP_URL+'/users/teamorder', data, {headers: {'id': user_id}});
      setScore(res.data.msg); //update it and render to browser screen
    }
    
    if(!userData.user)
        return <Login/>
    return (
        <div>
        
          <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="Coffee1">
          <Form.Label>Coffee1</Form.Label>
          <Form.Control name="coffee1" ref={register} placeholder="quanity" />
          <Form.Text className="text-muted">
            please enter your order quantity
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="Coffee2">
          <Form.Label>Coffee2</Form.Label>
          <Form.Control name="coffee2" ref={register} placeholder="quanity" />
          <Form.Text className="text-muted">
            please enter your order quantity
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="Coffee3">
          <Form.Label>Coffee3</Form.Label>
          <Form.Control name="coffee3" ref={register} placeholder="quanity" />
          <Form.Text className="text-muted">
            please enter your order quantity
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="Coffee4">
          <Form.Label>Coffee4</Form.Label>
          <Form.Control name="coffee4" ref={register} placeholder="quanity" />
          <Form.Text className="text-muted">
            please enter your order quantity
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="Coffee5">
          <Form.Label>Coffee5</Form.Label>
          <Form.Control name="coffee5" ref={register} placeholder="quanity" />
          <Form.Text className="text-muted">
            please enter your order quantity
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>

      You scored: {score}
      <br></br>

      <br></br>
      <iframe id= "test" frameborder="0" width="75%" height="500px" src="https://repl.it/@AlecDonovan1/CPMATemplate?lite=true" frameborder="200" margin = "-100px"></iframe>
      <button onClick={coffee1}>Coffee_demo</button> 
        </div>
    )
}