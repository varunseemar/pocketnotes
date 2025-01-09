import './App.css'
import Leftcomponent from './Leftcomponent'
import Rightcomponent from './Rightcomponent'
import Modal from './Modal'
import RightComponentMessage from './RightComponentMessage'
import { useState } from 'react'
import '@babel/polyfill';
import 'regenerator-runtime/runtime';
import {Toaster} from 'react-hot-toast'

const App = ()=> {
  var notesList = [];
  var noteValueList = [];
  var notesListStorage = JSON.parse(localStorage.getItem("notes"));
  var notesValueListStorage = JSON.parse(localStorage.getItem("noteValues"));
  const [displayModal, setDisplayModal] = useState(false);
  const [noteIndex, setNoteIndex] = useState(null);
  const [newGroupValues, setNewGroupValues] = useState({
    groupName: "",
    groupColorCode: "",
  })

  function openModal(){
    setDisplayModal(true);
  }

  function closeModal(){
    setDisplayModal(false);
  }
  
  return (
    <>
    <Toaster />
    <div className='main'>
      {displayModal ? <div className='mainModal'>
        <Modal closeModal={closeModal} displayModal={displayModal} newGroupValues={newGroupValues} setNewGroupValues={setNewGroupValues} notesList={notesList} noteValueList={noteValueList} />
      </div> : ""}
      <div className='mainBackground'>
        <div className='leftMain'>
          <Leftcomponent openModal={openModal} notesListStorage={notesListStorage} notesValueListStorage={notesValueListStorage} noteIndex={noteIndex} setNoteIndex={setNoteIndex} />
        </div>
        {noteIndex === null ? 
        <div className='rightMain'>
          <Rightcomponent />
        </div> :
        <div className='rightMessage'>
          <RightComponentMessage notesValueListStorage={notesValueListStorage[noteIndex]} noteIndex={noteIndex}/>
        </div>}
      </div>
    </div>
    </>
  )
}

export default App
