import "./Home.css"

const Home = () => {

    const rows  = 27;
    let count = 1;
    const columns = 13;

    let injuredAreas = [];

    let arrayFront = Array(rows*columns).fill(0);
    let arrayBack = Array(rows*columns).fill(0);

    const handleClickToNoteInjuries = (index)=>{
        if(injuredAreas.includes(index)){
            alert("Injury is already noted!")
            return;
        }
        document.getElementById(index).style.backgroundColor = "rgba(252, 34, 34)";
        document.getElementById(index).innerHTML = count;
        injuredAreas = [...injuredAreas, index];
        count=count+1;
        console.log("injuredHere", injuredAreas);
    }
    
    return ( 
        <div className="Home">
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
        </div>
     );
}
 
export default Home;