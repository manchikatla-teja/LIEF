import { useNavigate } from 'react-router';
import {useEffect, useState} from 'react';
import './Navbar.css'



const Navbar = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClickToLogout = ()=>{
        setShow(false);
        localStorage.clear();
        navigate('/');
    }
    useEffect(()=>{

        if(localStorage.getItem('userID')!=null || localStorage.getItem('userID')!=undefined){
            setShow(true);
        }
    },[show]);

    return ( 
        <div className="Navbar">
            {show && <button className="logoutButton" onClick={handleClickToLogout}>LOGOUT</button>}
            <span className="navbarTitle">LIEF PROJECT</span>
            {localStorage.getItem('userName')!=null && <span className="navbarUserName">Welcome, {localStorage.getItem('userName').toUpperCase()}</span>}
        </div>
     );
}
 
export default Navbar;