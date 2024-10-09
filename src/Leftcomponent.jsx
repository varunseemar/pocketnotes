import React, { useState } from "react";
import "./LeftComponent.css";
import ShowCreatedNotes from "./ShowCreatedNotes";

const Leftcomponent = ({ openModal, notesListStorage, notesValueListStorage,noteIndex,setNoteIndex }) => {

  return (
    <>
      <div className="mainLeftComp" style={{ backgroundColor: "white" }}>
        <p className="headingMainLeftComp">Pocket Notes</p>
        <div className="scrollableDiv">
          {notesListStorage && notesListStorage.map((note, index) => (
              <div key={index}>
                <ShowCreatedNotes note={note} notesValueListStorage={notesValueListStorage[index]} isSelected = {noteIndex === index} onSelect={()=>setNoteIndex(index)}/>
              </div>
           ))}
        </div>
        <div className="addMainLeftComp" onClick={openModal}>
          <p className="addSignAddMainLeftComp">+</p>
        </div>
      </div>
    </>
  );
};

export default Leftcomponent;
