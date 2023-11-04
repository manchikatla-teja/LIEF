import { useState } from "react";
import "../Home/Home.css"
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {React} from 'react';


const rows  = 27;
const columns = 13;
let arrayFront = Array(rows*columns).fill(0);
let arrayBack = Array(rows*columns).fill(0);

const UpdatePatient = () => {
    
    const state = useLocation();
    const data = state.state ? state.state.patient : "";
    //console.log(data);
    const navigate = useNavigate();
    const [nameOfTheReporter, setNameOfTheReporter] = useState(data.nameOfTheReporter);
    const [dateOfInjury, setDateOfInjury] = useState(data.dateOfInjury);
    const [dateOfReport, setDateOfReport] = useState(data.dateOfReport);
    const [timeOfInjury, setTimeOfInjury] = useState(data.timeOfInjury);
    const [currentlySelectedInjury, setCurrentlySelectedInjury] = useState(0);
    const [count, setCount] = useState(data.injuriesSaved.length);
    const [injuredAreas, setInjuredAreas] = useState(data.injuredAreas);
    const [injuriesSaved, setInjuriesSaved] = useState(data.injuriesSaved);
    const [typeOfInjury, setTypeOfInjury] = useState("");
    const [severityOfInjury, setSeverityOfInjury] = useState("");
    //console.log(data, currentlySelectedInjury);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:4000/injuryPost",{nameOfTheReporter,dateOfInjury,timeOfInjury,dateOfReport, injuredAreas, injuriesSaved})
        .then(result=>{
            //console.log(result);
            //setCurrentlySelectedInjury(0);
            setInjuredAreas([]);
            setInjuriesSaved([]);
            setCount(1);
        })
        .catch(err=>console.log(err))

        try{
            await axios.delete(`http://localhost:4000/deletePatient/${data._id}`) //pass data to delete as params
                                                                             //passing as body was not working
            .then(result=>{
                //console.log(result);
                //setData(data.filter((patient)=> patient._id!==_id)); //instead of rendering whole page we are taking out
                                                                     // the deleted datas
                
                navigate("/mainpage");
            });
        }
        catch(error){
            console.error('Couldn\'t delete!', error);
        }
    }

    const handleClickToNoteInjuries = async (index)=>{
        
        if(injuredAreas.includes(index)){
            var selected = document.getElementById(index).innerHTML;
            setCurrentlySelectedInjury(selected);
            
            var element = injuriesSaved.find((injury)=>injury.injuredAreaNumber===selected);

            document.getElementById("typeOfInjury").value = element.typeOfInjury;
            document.getElementById("severityOfInjury").value = element.severityOfInjury;
            return;
        }
        document.getElementById(index).style.backgroundColor = "rgba(252, 34, 34)";
        document.getElementById(index).innerHTML = count+1;
        setCurrentlySelectedInjury(document.getElementById(index).innerHTML);
        await setInjuredAreas([...injuredAreas, index]);
        setCount(count+1);
        //console.log("injuredHere", injuredAreas);
    }

    //saves the injury, the thing is once you click something you have to save the injury for sure.
    const handleClickToSaveInjury = ()=>{
        
        var element = injuriesSaved.find((injury)=>injury.injuredAreaNumber===currentlySelectedInjury);

        if(element===undefined){//the injury is not saved
            setInjuriesSaved([...injuriesSaved, {
                injuredAreaNumber: currentlySelectedInjury+1,
                typeOfInjury: document.getElementById("typeOfInjury").value,
                severityOfInjury: document.getElementById("severityOfInjury").value,
            }]);
        }
        else{//this is to update the injury
            let temp = injuriesSaved;
            temp[injuriesSaved.indexOf(element)] =  {
                injuredAreaNumber: currentlySelectedInjury+1,
                typeOfInjury: document.getElementById("typeOfInjury").value,
                severityOfInjury: document.getElementById("severityOfInjury").value,
            };
            setInjuriesSaved(temp);
        }

    }

    const handleClickToDetailsOfInjury= (indexOfTheInjury)=>{
        var i = data.injuredAreas.indexOf(indexOfTheInjury);
        setCurrentlySelectedInjury(i+1);
        setTypeOfInjury(data.injuriesSaved[i].typeOfInjury);
        setSeverityOfInjury(data.injuriesSaved[i].severityOfInjury);
    }


        return ( 
            <div className="Home">
                
                <div className="InjuryDetails"> <span>Details Of Injury</span>
                <div className="detail">
                <label>Name of the reporter:</label>
                <input type="text" placeholder="Enter name..." id="nameOfTheReporter" onChange={(e)=>setNameOfTheReporter(e.target.value)}  value={nameOfTheReporter}></input><br/></div>
                <div className="detail">
                <label>Date when the injury occured:</label>
                <input type="date" placeholder="" id="dateOfInjury" onChange={(e)=>setDateOfInjury(e.target.value)} value={dateOfInjury}></input><br/></div>
                <div className="detail">
                <label>Time when the injury occured:</label>
                <input type="time" placeholder="" id="TimeofInjury" onChange={(e)=>setTimeOfInjury(e.target.value)} value={timeOfInjury}></input></div>
                <div className="detail">
                <label>Date when the injury is reported:</label>
                <input type="date" placeholder="" id="dateOfReport" onChange={(e)=>setDateOfReport(e.target.value)} value={dateOfReport}></input><br/></div>
                </div>
                
                <div className="InjuryNote">
                <div className="bodies">
                    <span style={{alignSelf:"center", fontSize:"1rem", fontWeight:"500", marginBottom: "1rem"}}>Please select the area of injury:</span>
    
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                        <span  className="textsofBodies">FRONT BODY</span>
                        <span  className="textsofBodies">BACK BODY</span>
                    </div>
    
                    <div style={{display:"flex", flexDirection:"row"}}>
    
                        <div className="body" id="bodyFront">
                            {arrayFront.map((val, index)=>{
                                if(data.injuredAreas.includes(index)){
                                    return <div className="gridcell" id={index} onClick={()=>handleClickToDetailsOfInjury(index)} key={index} style={{backgroundColor: "red"}}>{data.injuredAreas.indexOf(index)+1}</div>
                                }
                            return <div className="gridcell" id={index} onClick={()=>handleClickToNoteInjuries(index)} key={index}></div>
                            })}
                        </div>
    
                        <div className="body" id="bodyBack">
                            {arrayBack.map((val, index)=>{
                                let temp = (27*13)+index;
                                if(data.injuredAreas.includes(temp)){
                                    return <div className="gridcell" id={temp} onClick={()=>handleClickToDetailsOfInjury(temp)} key= {index} style={{backgroundColor: "red"}}>{data.injuredAreas.indexOf(temp)+1}</div>
                                }
                                return <div className="gridcell" id={temp} onClick={()=>handleClickToNoteInjuries(temp)} key= {index}></div>
                            })}
                        </div>
    
                    </div>
                
                </div>

                <div style={{display:"flex", flexDirection:"column"}}>
                <div className="infoAboutInjury">
                    <span>Injury number {currentlySelectedInjury}</span>
                    <div className="selectDetailsOfInjury">
                    <label>Type of Injury:</label>
                <select id="typeOfInjury">
                    <option value="infection">infection</option>
                    <option value="accident">accident</option>
                    <option value="other">other</option>
                    </select><br/>
                    </div>
                
                <div>
                    {typeOfInjury}, {severityOfInjury}
                </div>

                <div className="selectDetailsOfInjury">
                    <label>Severity of Injury:</label>

                    
                <select id="severityOfInjury">
                    <option value="dangerous">dangerous</option>
                    <option value="moderate">moderate</option>
                    <option value="firstAid">firstAid</option>
                    </select><br/>
                    </div>

                    <button className="saveInjuryButton" onClick={()=>handleClickToSaveInjury()}>SAVE</button>
    
                </div>
            
                <button className="submitButton" onClick={handleSubmit}>SUBMIT</button>

                </div>

                </div>
            </div>
         );
}
 
export default UpdatePatient;