import { useState } from "react";
import "../Home/Home.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {React} from 'react';
import { useLocation } from "react-router";


const rows  = 27;
const columns = 13;
let arrayFront = Array(rows*columns).fill(0);
let arrayBack = Array(rows*columns).fill(0);

const ExistingPatient = () => {
    const state = useLocation();
    const patientData = state.state ? state.state.patient : "";
    
    const navigate = useNavigate();
    const [currentlySelectedInjury, setCurrentlySelectedInjury] = useState(0);
    const [typeOfInjury, setTypeOfInjury] = useState("");
    const [severityOfInjury, setSeverityOfInjury] = useState("");


    
    const handleClickToDetailsOfInjury= (indexOfTheInjury)=>{
        var i = patientData.injuredAreas.indexOf(indexOfTheInjury);
        setCurrentlySelectedInjury(i);
        setTypeOfInjury(patientData.injuriesSaved[i].typeOfInjury);
        setSeverityOfInjury(patientData.injuriesSaved[i].severityOfInjury);
    }

  

    
    return ( 
        <div className="existingPatient">
            
            <div className="NameDateTimeOfInjury">Details Of Injury<br/>
            <label>Name of the reporter:  </label>
            <span>{patientData.nameOfTheReporter}</span><br/>
            <label>Date when the injury occured:  </label>
            <span>{patientData.dateOfInjury}</span><br/>
            <label>Time when the injury occured:  </label>
            <span>{patientData.timeOfInjury}</span><br/>
            </div>
            
            
            <div className="bodies">
                <span style={{alignSelf:"center", fontSize:"1rem", fontWeight:"500", marginBottom: "1rem"}}>Please select the area of injury:</span>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                    <span  className="textsofBodies">FRONT BODY</span>
                    <span  className="textsofBodies">BACK BODY</span>
                </div>

                <div style={{display:"flex", flexDirection:"row"}}>

                    <div className="body" id="bodyFront">
                        {arrayFront.map((val, index)=>{
                            if(patientData.injuredAreas.includes(index)){
                                return <div className="gridcell" id={index} onClick={()=>handleClickToDetailsOfInjury(index)} key={index} style={{backgroundColor: "red"}}>{patientData.injuredAreas.indexOf(index)}</div>
                            }
                        return <div className="gridcell" id={index} onClick={()=>{}} key={index}></div>
                        })}
                    </div>

                    <div className="body" id="bodyBack">
                        {arrayBack.map((val, index)=>{
                            let temp = (27*13)+index;
                            if(patientData.injuredAreas.includes(temp)){
                                return <div className="gridcell" id={temp} onClick={()=>handleClickToDetailsOfInjury(temp)} key= {index} style={{backgroundColor: "red"}}>{patientData.injuredAreas.indexOf(temp)}</div>
                            }
                            return <div className="gridcell" id={temp} onClick={()=>{}} key= {index}></div>
                        })}
                    </div>

                </div>
            
            </div>
            <div className="infoAboutInjury">
                <span>Injury number {currentlySelectedInjury}</span><br/>
                <label>Type of Injury:</label>
            <span>{typeOfInjury}</span><br/>

                <label>Severity of Injury:</label>
                <span>{severityOfInjury}</span><br/>

            </div>
        
        </div>
     );
}
 
export default ExistingPatient;