import { useState } from "react";
import "./Home.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {React} from 'react';
import { useLocation } from "react-router";




let count = 1;
let injuredAreas = [];
let injuriesSaved = [];
const rows  = 27;
const columns = 13;
let arrayFront = Array(rows*columns).fill(0);
let arrayBack = Array(rows*columns).fill(0);

const Home = () => {

    const state = useLocation();
    const data = state.state ? state.state.val : "";
    const navigate = useNavigate();
    const [nameOfTheReporter, setNameOfTheReporter] = useState("");
    const [dateOfInjury, setDateOfInjury] = useState("");
    const [timeOfInjury, setTimeOfInjury] = useState("");
    const [currentlySelectedInjury, setCurrentlySelectedInjury] = useState(0);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:4000/injuryPost",{nameOfTheReporter,dateOfInjury,timeOfInjury, injuredAreas, injuriesSaved})
        .then(result=>{
            console.log(result);
            navigate("/mainpage");
        })
        .catch(err=>console.log(err))
    }

    const handleClickToNoteInjuries = (index)=>{
        
        if(injuredAreas.includes(index)){
            var selected = document.getElementById(index).innerHTML;
            setCurrentlySelectedInjury(selected);
            
            var element = injuriesSaved.find((injury)=>injury.injuredAreaNumber===selected);

            document.getElementById("typeOfInjury").value = element.typeOfInjury;
            document.getElementById("severityOfInjury").value = element.severityOfInjury;
            return;
        }
        document.getElementById(index).style.backgroundColor = "rgba(252, 34, 34)";
        document.getElementById(index).innerHTML = count;
        setCurrentlySelectedInjury(document.getElementById(index).innerHTML);
        injuredAreas = [...injuredAreas, index];
        count=count+1;
        console.log("injuredHere", injuredAreas);
    }

    //saves the injury, the thing is once you click something you have to save the injury for sure.
    const handleClickToSaveInjury = ()=>{
        
        var element = injuriesSaved.find((injury)=>injury.injuredAreaNumber===currentlySelectedInjury);

        if(element===undefined){//the injury is not saved
            injuriesSaved = [...injuriesSaved, {
                injuredAreaNumber: currentlySelectedInjury,
                typeOfInjury: document.getElementById("typeOfInjury").value,
                severityOfInjury: document.getElementById("severityOfInjury").value,
            }];
        }
        else{//this is to update the injury
            injuriesSaved[injuriesSaved.indexOf(element)] =  {
                injuredAreaNumber: currentlySelectedInjury,
                typeOfInjury: document.getElementById("typeOfInjury").value,
                severityOfInjury: document.getElementById("severityOfInjury").value,
            };
        }

    }

    
    return ( 
        <div className="Home">
            
            <div className="NameDateTimeOfInjury">Details Of Injury<br/>
            <label>Name of the reporter:</label>
            <input type="text" placeholder="Enter name..." id="nameOfTheReporter" onChange={(e)=>setNameOfTheReporter(e.target.value)}  value={nameOfTheReporter}></input><br/>
            <label>Date when the injury occured:</label>
            <input type="date" placeholder="" id="dateOfInjury" onChange={(e)=>setDateOfInjury(e.target.value)} value={dateOfInjury}></input><br/>
            <label>Time when the injury occured:</label>
            <input type="time" placeholder="" id="TimeofInjury" onChange={(e)=>setTimeOfInjury(e.target.value)} value={timeOfInjury}></input>
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
                        return <div className="gridcell" id={index} onClick={()=>handleClickToNoteInjuries(index)} key={index}></div>
                        })}
                    </div>

                    <div className="body" id="bodyBack">
                        {arrayBack.map((val, index)=>{
                            let temp = (27*13)+index;
                            return <div className="gridcell" id={temp} onClick={()=>handleClickToNoteInjuries(temp)} key= {index}></div>
                        })}
                    </div>

                </div>
            
            </div>
            <div className="infoAboutInjury">
                <span>Injury number {currentlySelectedInjury}</span><br/>
                <label>Type of Injury:</label>
            <select id="typeOfInjury">
                <option value="infection">Infection</option>
                <option value="accident">Accident</option>
                <option value="other">Other</option>
                </select><br/>

                <label>Severity of Injury:</label>
            <select id="severityOfInjury">
                <option value="dangerous">Dangerous</option>
                <option value="moderate">Moderate</option>
                <option value="firstAid">First-Aid</option>
                </select><br/>
                <div onClick={()=>handleClickToSaveInjury()}>SAVE</div>

            </div>
        
            <div style={{background:"red", width: "10rem"}} onClick={handleSubmit}>SuBMit</div>
        </div>
     );
}
 
export default Home;