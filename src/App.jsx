import './App.css'
import Leftcomponent from './Leftcomponent'
import Rightcomponent from './Rightcomponent'
import Modal from './Modal'
import RightComponentMessage  from './RightComponentMessage'
import { useState} from 'react'
import '@babel/polyfill';
import 'regenerator-runtime/runtime';

const App = ()=>{
  var notesList = [];
  var noteValueList = [];
  var notesListStorage = JSON.parse(localStorage.getItem("notes"));
  var notesValueListStorage = JSON.parse(localStorage.getItem("noteValues"));
  const [displayModal,setDisplayModal] = useState(false);
  const [noteIndex,setNoteIndex] = useState(null);
  const [newGroupValues,setNewGroupValues] = useState({
    groupName:"",
    groupColorCode:"",
  })

  function openModal(){
    setDisplayModal(true);
  }

  function closeModal(){
    setDisplayModal(false);
  }
  
  return (
    <div className='main'>
      {displayModal?<div className='mainModal' style={{position:"fixed",zIndex:"20",display:"flex",width:"100%",height:"100vh",backgroundColor:"rgba(0,0,0,0.4)",alignSelf:"center"}}>
        <Modal closeModal={closeModal} displayModal={displayModal} newGroupValues={newGroupValues} setNewGroupValues={setNewGroupValues} notesList={notesList} noteValueList={noteValueList} />
      </div>:""}
      <div className='mainBackground' style={{display:"flex"}}>
        <div className='leftMain' style={{width:"25vw",backgroundColor:"white",height:"100vh"}}>
          <Leftcomponent openModal={openModal} notesListStorage={notesListStorage} notesValueListStorage={notesValueListStorage} noteIndex={noteIndex} setNoteIndex={setNoteIndex} />
        </div>
        {noteIndex === null ? 
        <div className='rightMain' style={{width:"75vw",backgroundColor:"#DAE5F5",height:"100vh"}}>
          <Rightcomponent />
        </div> :
        <div>
          <RightComponentMessage notesValueListStorage={notesValueListStorage[noteIndex]} noteIndex={noteIndex}/>
        </div>}
      </div>
    </div>
  )

}

export default App
