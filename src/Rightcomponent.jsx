import react from "react";
import "./RightComponent.css"
const Rightcomponent = ()=>{
    return(
        <>
        <div className="mainRightComp">
            <img className="imageMainRightComp" src="images\image-removebg-preview 1.png"></img>
            <p style={{fontFamily:"Roboto",fontSize:"43px",textAlign:"center",fontWeight:"600",marginTop:"10px",marginBottom:"0px"}}>Pocket Notes</p>
            <p style={{textAlign:"center",marginTop:"20px",fontFamily:"Roboto",fontSize:"18px",fontWeight:"500",marginBottom:"0px"}}>Send and receive messages without keeping your phone online.</p>
            <p style={{textAlign:"center",fontFamily:"Roboto",fontSize:"18px",fontWeight:"500",marginTop:"3px"}}>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
            <img style={{marginLeft:"32vw",marginTop:"150px"}} src="images\Vector.png"></img><span style={{fontFamily:"Roboto",fontSize:"16px",fontWeight:"400"}}>&nbsp;&nbsp;end-to-end encrypted</span>
        </div>
        </>
    )
}

export default Rightcomponent;