import react from 'react'
import "./Modal.css"
import { useRef ,useEffect} from 'react'
const Modal = ({closeModal,displayModal,newGroupValues,setNewGroupValues,notesList,noteValueList}) => {
    const modalContainerRef = useRef();
    function checkClickOutside(e){
        if(displayModal && modalContainerRef.current && !modalContainerRef.current.contains(e.target)){
            setNewGroupValues({
                ...newGroupValues,
                groupName:"",
                groupColorCode:""
            })
            closeModal();
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown',checkClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkClickOutside)
        }
    },[displayModal])

    function handleInput(e){
        setNewGroupValues({
            ...newGroupValues,
            [e.target.name] : e.target.value 
        });
    }

    function handleColorSelection(e){
        setNewGroupValues({
            ...newGroupValues,
            [e.target.name] : e.target.style.backgroundColor 
        });
    }

    function saveNotes(noteName){
        if(localStorage.getItem("notes") === null){
            localStorage.setItem("notes",JSON.stringify(notesList))
        }
        if(localStorage.getItem("notes") !== null){
            let storedNotesArray = JSON.parse(localStorage.getItem("notes"))
            notesList = storedNotesArray;
            notesList.push(noteName);
            localStorage.setItem("notes",JSON.stringify(notesList))
        }
    }

    function saveNoteValues(newGroupValues){
        if(localStorage.getItem("noteValues") === null){
            localStorage.setItem("noteValues",JSON.stringify(noteValueList))
        }
        if(localStorage.getItem("noteValues") !== null){
            let storedNotesValuesArray = JSON.parse(localStorage.getItem("noteValues"))
            noteValueList = storedNotesValuesArray;
            noteValueList.push(newGroupValues);
            localStorage.setItem("noteValues",JSON.stringify(noteValueList))
        }
    }

    function handleCreate(e){
        e.preventDefault();
        if(newGroupValues.groupName === "" || newGroupValues.groupColorCode === ""){
            alert("Please Fill in the Group Name and Choose a Color");
            return;
        }
        else{
            let noteName = newGroupValues.groupName;
            saveNotes(noteName);
            saveNoteValues(newGroupValues)
            closeModal();
            setNewGroupValues({
                ...newGroupValues,
                groupName:"",
                groupColorCode:""
            })
        }
    }

  return (
    <>
    <div className='modalContainer' ref={modalContainerRef}>
        <div className='modalHeading'>
            <p>Create New Group</p>
        </div>
        <div className='modalGroupName'>
            <p>Group Name<span><input value={newGroupValues.groupName} type='text' name="groupName" placeholder='Enter Group Name' onChange={handleInput} style={{borderRadius:"12px",border:"1px solid grey",marginLeft:"30px",width:"300px",height:"30px",paddingLeft:"20px"}}></input></span></p>
        </div>
        <div className='modalChooseColor' style={{display:"flex"}}>
            <p>Choose Color</p>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#B38BFA",marginLeft:"40px",border:"1px solid #B38BFA"}} >
            </button>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#FF79F2",border:"1px solid #FF79F2"}}>
            </button>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#43E6FC",border:"1px solid #43E6FC"}}>
            </button>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#F19576",border:"1px solid #F19576"}}>
            </button>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#0047FF",border:"1px solid #0047FF"}}>
            </button>
            <button name="groupColorCode" onClick={handleColorSelection} style={{height:"25px",width:"25px",borderRadius:"50%",backgroundColor:"#6691FF",border:"1px solid #6691FF"}}>
            </button>
        </div>
        <div className='modalFooter' onClick={handleCreate} style={{backgroundColor:"#001F8B",color:"white",borderRadius:"8px"}}>
            Create
        </div>
    </div>
    </>
  )
}

export default Modal;
