import { useNavigate} from "react-router";
import axios from 'axios'
import "./MainPage.css"
import { useEffect, useState } from "react";
import NotLoggedIn from "../NotLoggedIn/NotLoggedIn";

const MainPage = () => {

    


    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [test, setTest] = useState(true);
    const [unchangedData, setUnchangedData] = useState([]);

    const userID = localStorage.getItem('userID');

    useEffect(()=>{

        const fetchCollection = async () => {
            try {
              const response = await axios.get('http://localhost:4000/injuryPost'); // Replace with your API endpoint
              const temp = response.data.filter((item)=>item.userID===userID);
              setData(temp.reverse());
              setUnchangedData(temp.reverse());
            } catch (error) {
              console.error('Error fetching collection:', error);
            }
          };
          //console.log("inside USEFEEFECt");
          
        fetchCollection();
    },[]);

    if(localStorage.getItem('userID')==null || localStorage.getItem('userID')==undefined){
        return (<NotLoggedIn/>);
    }


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
            <div className="filterBox">
            <div className="filter">
            <span>SEARCH BY NAME:</span>
            <input type="text" placeholder="Enter name to search..." id="searchByName" onChange={(e)=>handleSearchByName(e)}></input><br/>
            </div>
            <div className="filter">
            <span>FILTER BY DATES OF INJURY:</span><br/>
            <label>START DATE:</label>
            <input type="date" placeholder="" id="startDateOfInjuryToFilter"></input>
            <label>END DATE:</label>
            <input type="date" placeholder="" id="endDateOfInjuryToFilter"></input><br/>
            <button onClick={handleClickToFilterByInjuryDates}>FILTER (Injury)</button>
            </div>
            <div className="filter">
            <span>FILTER BY DATES OF REPORT:</span><br/>
            <label>START DATE:</label>
            <input type="date" placeholder="" id="startDateOfReportToFilter"></input>
            <label>END DATE:</label>
            <input type="date" placeholder="" id="endDateOfReportToFilter"></input><br/>
            <button onClick={handleClickToFilterByReportDates}>FILTER (Report)</button>
            </div>
            </div>
            <div style={{margin:"1rem"}}>To sort the data according to their names/dateofinjury/dateofreport , click on the respective tag</div>
            <table>
                <tr className="headingRowInTable">
                    <td onClick={handleSortByName} style={{cursor:"pointer"}}>Name of Reported</td>
                    <td onClick={handleSortByDateOfInjury} style={{cursor:"pointer"}}>Date of Injury</td>
                    <td>Time of Injury</td>
                    <td onClick={handleSortByDateOfReport} style={{cursor:"pointer"}}>Date of Report</td>
                </tr>
                {
                // data && 
                data.map((item, key)=>{
                    //console.log(item);
                    return (<tr id={key} className="dataRowInTable">
                        
                        <td>{item.nameOfTheReporter}</td>
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
            <button onClick={()=>handleClickToAddNewReporter()}>ADD A NEW REPORTER</button>
            
            
        </div>
     );
}
 
export default MainPage;