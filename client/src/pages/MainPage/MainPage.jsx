import { useNavigate} from "react-router";
import axios from 'axios'
import { useEffect, useState } from "react";
const MainPage = () => {


    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(()=>{

        const fetchCollection = async () => {
            try {
              const response = await axios.get('http://localhost:4000/injuryPost'); // Replace with your API endpoint
              setData(response.data);
            } catch (error) {
              console.error('Error fetching collection:', error);
            }
          };
          
        fetchCollection();
    },[]);



    const handleClickToAddNewReporter = ()=>{
        navigate('/home')
    }

    return ( 
        <div className="MainPage">
            <table>
                <tr>
                    <td>Name of Reported</td>
                    <td>Date of Injury</td>
                    <td>Time of Injury</td>
                    <td>Date of Report</td>
                </tr>
                {data && data.map((item, key)=>{
                    return (<tr id={key} onClick={()=>{
                        navigate('/existpatient', {state:{patient: item}});
                    }}>
                        <td>{item.nameOfTheReporter}</td>
                        <td>{item.dateOfInjury}</td>
                        <td>{item.timeOfInjury}</td>
                    </tr>)
                })}
            </table>
            <div onClick={()=>handleClickToAddNewReporter()}>ADD A NEW REPORTER</div>
        </div>
     );
}
 
export default MainPage;