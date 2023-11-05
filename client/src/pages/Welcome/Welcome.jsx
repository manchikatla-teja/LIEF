import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import "./Welcome.css"
const Welcome = () => {

    const navigate = useNavigate();

    return ( 
        <div className="Welcome">
            <Navbar/>   
            <span className="welcomeTitle">WELCOME TO LIEF PROJECT</span><br/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <div>
            <span className="welcomeQuestion">Already a user?</span><br/>
            <button onClick={()=>navigate('/login')}>Login Here</button><br/>
            </div>
            <span style={{margin: "1rem 2rem"}} className="welcomeQuestion">OR</span><br/>
            <div>
            <span className="welcomeQuestion">New here?</span><br/>
            <button  onClick={()=>navigate('/signup')}>SignUp Here</button>
            </div>
            </div>
        </div>
     );
}
 
export default Welcome;