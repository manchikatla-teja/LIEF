import { useNavigate} from "react-router";
import axios from 'axios'
import { useEffect, useState } from "react";

const MainPage = () => {


    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [test, setTest] = useState(true);
    const [unchangedData, setUnchangedData] = useState([]);
    useEffect(()=>{

        const fetchCollection = async () => {
            try {
              const response = await axios.get('http://localhost:4000/injuryPost'); // Replace with your API endpoint
              setData(response.data.reverse());
              setUnchangedData(response.data.reverse());
            } catch (error) {
              console.error('Error fetching collection:', error);
            }
          };

          //console.log("inside USEFEEFECt");
          
        fetchCollection();
    },[]);


    const handleDeletePatient = async (_id)=>{
        //console.log("handleDeletePatienion = ",{_id});
        try{
            await axios.delete(`http://localhost:4000/deletePatient/${_id}`) //pass data to delete as params
                                                                             //passing as body was not working
            .then(result=>{
                //console.log(result);
                setData(data.filter((patient)=> patient._id!==_id)); //instead of rendering whole page we are taking out
                                                                     // the deleted datas
            });
        }
        catch(error){
            console.error('Couldn\'t delete!', error);
        }
    }

    const handleClickToAddNewReporter = ()=>{
        navigate('/home');
        //window.location.reload();
    }

    const handleSortByName = ()=>{
        let temp = data;
        temp.sort(function(a, b){return a.nameOfTheReporter.localeCompare(b.nameOfTheReporter)});
        setData(temp);
        setTest(!test);//dont know why but it is sorting and showing the result on page
                   // without this the array is sorted but not showing on page
    }
    const handleSortByDateOfInjury = ()=>{
        let temp = data;
        temp.sort(function(a, b){return a.dateOfInjury.localeCompare(b.dateOfInjury)});
        setData(temp);
        setTest(!test);//dont know why but it is sorting and showing the result on page
                   // without this the array is sorted but not showing on page
    }
    const handleSortByDateOfReport = ()=>{
        let temp = data;
        temp.sort(function(a, b){return a.dateOfReport.localeCompare(b.dateOfReport)});
        setData(temp);
        setTest(!test);//dont know why but it is sorting and showing the result on page
                   // without this the array is sorted but not showing on page
    }

    const handleSearchByName = (e)=>{
        let temp = [];
        unchangedData.map((patient)=>{
            //console.log(patient.nameOfTheReporter, e.target.value);
            if(patient.nameOfTheReporter.toLowerCase().includes(e.target.value.toLowerCase())){
                temp = [...temp, patient];
            }
        });
        setData(temp);
        
    }

    const handleClickToFilterByInjuryDates = ()=>{
        const startDate = document.getElementById("startDateOfInjuryToFilter").value;
        const endDate = document.getElementById("endDateOfInjuryToFilter").value;
        let temp = [];
        unchangedData.map((patient)=>{
            if(patient.dateOfInjury > startDate && patient.dateOfInjury < endDate){
                temp = [...temp, patient];
            }
        })
        setData(temp);
        setTest(!test);
    }

    const handleClickToFilterByReportDates = ()=>{
        const startDate = document.getElementById("startDateOfReportToFilter").value;
        const endDate = document.getElementById("endDateOfReportToFilter").value;
        let temp = [];
        unchangedData.map((patient)=>{
            if(patient.dateOfReport > startDate && patient.dateOfReport < endDate){
                temp = [...temp, patient];
            }
        })
        setData(temp);
        setTest(!test);
    }

    return ( 
        <div className="MainPage">

            <label>SEARCH BY NAME:</label>
            <input type="text" placeholder="Enter name to search..." id="searchByName" onChange={(e)=>handleSearchByName(e)}></input><br/>
            <label>FILTER BY DATES OF INJURY:</label>
            <label>START DATE:</label>
            <input type="date" placeholder="" id="startDateOfInjuryToFilter"></input><br/>
            <label>END DATE:</label>
            <input type="date" placeholder="" id="endDateOfInjuryToFilter"></input><br/>
            <button onClick={handleClickToFilterByInjuryDates}>FILTER (Injury)</button>

            <br/>
            <label>FILTER BY DATES OF REPORT:</label>
            <label>START DATE:</label>
            <input type="date" placeholder="" id="startDateOfReportToFilter"></input><br/>
            <label>END DATE:</label>
            <input type="date" placeholder="" id="endDateOfReportToFilter"></input><br/>
            <button onClick={handleClickToFilterByReportDates}>FILTER (Report)</button>

            <table>
                <tr>
                    <td onClick={handleSortByName}> |Name of Reported| </td>
                    <td onClick={handleSortByDateOfInjury}>Date of Injury</td>
                    <td>Time of Injury</td>
                    <td onClick={handleSortByDateOfReport}>Date of Report</td>
                </tr>
                {
                // data && 
                data.map((item, key)=>{
                    //console.log(item);
                    return (<tr id={key}>
                        
                        <td onClick={()=>{navigate('/existpatient', {state:{patient: item}})}}>{item.nameOfTheReporter}</td>
                        <td>{item.dateOfInjury}</td>
                        <td>{item.timeOfInjury}</td>
                        <td>{item.dateOfReport}</td>
                        <button className="changeInfoOfPatient" onClick={()=>{  
                        navigate('/updatepatient', {state:{patient: item}});
                    }}>CHANGE INFO</button>
                        <button className="deletePatientButton" onClick={()=>handleDeletePatient(item._id)}>DELETE PATIENT</button>
                    </tr>)
                })
                }
            </table>
            <div onClick={()=>handleClickToAddNewReporter()}>ADD A NEW REPORTER</div>
            
            
        </div>
     );
}
 
export default MainPage;