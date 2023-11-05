import {useNavigate} from "react-router-dom";

const NotLoggedIn = () => {
    const navigate = useNavigate();
    return ( 
        <div style={{color: "white"}}>
            <span> You are not logged in!!</span><br/>
            <button onClick={()=>navigate('/login')}>
                Login Here
            </button>
            <br/>
            <span> To create account, click below!!</span><br/>
            <button onClick={()=>navigate('/signup')}>
                Signup Here
            </button>
        </div>
     );
}
 
export default NotLoggedIn;