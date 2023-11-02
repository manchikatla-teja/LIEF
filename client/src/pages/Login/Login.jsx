import { Link } from "react-router-dom";
import "../Signup/Signup.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/login", {email, password})
        .then(result=>{
            localStorage.setItem('userID', result.data);
            setEmail("");
            setPassword("");
            if(result.data!=="Invalid password" && result.data!=="No such record exists"){
                navigate('/home');
            }
        })
        .catch(err=>console.log(err))
    }

    return ( 
        <div className="signup">
            <span className="header">Login</span>
            <form className="signupForm">
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
            <button className="FormButton" onClick={handleSubmit}>Login</button><br/>
            <span>Not a user? To create your account</span>
            <Link to="/signup" style={{ textDecoration: 'none', color:"black" }}className="FormButton">Sign up Here</Link>
        </div>
     );
}
 
export default Login;