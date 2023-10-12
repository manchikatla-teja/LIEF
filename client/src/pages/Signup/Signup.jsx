import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Signup.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/signup", {name, email, password})
        .then(result=>{
            console.log(result);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");
        })
        .catch(err=>console.log(err))
    }

    return ( 
        <div className="signup">
            <span className="header">SIGN UP</span>
            <form className="signupForm">
                <div className="forminput">
                    <label>Name:</label>
                    <input type="text" placeholder="Enter your Name..." id="name" onChange={(e)=>setName(e.target.value)} value={name}></input>
                </div>
                <div className="forminput">
                    <label>Email:</label>
                    <input type = "email" placeholder="Enter your EMail..." id="email" onChange={(e)=>setEmail(e.target.value)}
                    value={email}></input>
                </div>
                <div className="forminput">
                    <label>Password:</label>
                    <input type="password" placeholder="Enter your Password..." id="password" onChange={(e)=>setPassword(e.target.value)}
                     value={password}></input>
                </div>
                
            
            
            </form>
            <button className="FormButton" onClick={handleSubmit}>SignUp</button>
            <br/>
            <span>Already a user?</span><Link to="/login" style={{ textDecoration: 'none', color:"black" }} className="FormButton">Login Here</Link>
        </div>
     );
}
 
export default SignUp;