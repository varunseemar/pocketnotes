import React from 'react'
import styles from './RightComponentMessage.module.css'
import { useState,useEffect } from 'react';
import disabledsend from '/images/disabledsend.png'
import enabledsend from '/images/enabledsend.png'
import ShowMessages from './ShowMessages';

const RightComponentMessage = ({notesValueListStorage,noteIndex}) => {
const [shortName,setShortName] = useState();
const [textMessage,setTextMessage] = useState('');
const [sendImage,setSendImage] = useState(false);
const [displayMessage,setDisplayMessage] = useState([]);
useEffect(()=>{
    function createNickName(note){
        if(note){
            let whiteSpacedStr = note;
            let upperCaseWhiteSpacedStr = whiteSpacedStr.toUpperCase();
            let trimStr = upperCaseWhiteSpacedStr.trim();
            let splitStr = trimStr.split(" ");
            let strLength = splitStr.length;
            let nickName = "";
            if(strLength <= 1){
                nickName = splitStr[0][0];
            }
            if(strLength > 1){
                nickName = splitStr[0][0] + splitStr[1][0]; 
            }
            return nickName;
        }
    }

    var nickName = createNickName(notesValueListStorage.groupName);
    const messageArray = JSON.parse(localStorage.getItem('noteMessages'));
    const message = messageArray?.find((object) => object.groupIndex === noteIndex);
    setDisplayMessage(message?.groupMessages || []);
    setShortName(nickName);
    setTextMessage('');
    setSendImage(false);
},[notesValueListStorage])

const handleChange = (e)=>{
    setTextMessage(e.target.value);
    if(e.target.value.length > 0){
        setSendImage(true);
    }
    else{
        setSendImage(false);
    }
}

const handleSendMessage = ()=>{
    if(textMessage.length < 1 || sendImage === false){
        return;
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getFullYear()}`;
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const messageWithTimestamp = {
        text: textMessage,
        date: formattedDate,
        time: formattedTime,
    };
    let messagesArray = JSON.parse(localStorage.getItem('noteMessages')) || [];
    if(!Array.isArray(messagesArray)){
        messagesArray = [];
    }
    const existingNote = messagesArray.find((object) => object.groupIndex === noteIndex);
    if(existingNote){
        existingNote.groupMessages.push(messageWithTimestamp);
    } 
    else{
        const newNoteMessages = {
            groupIndex: noteIndex,
            groupMessages: [messageWithTimestamp],
        };
        messagesArray.push(newNoteMessages);
    }
    localStorage.setItem('noteMessages', JSON.stringify(messagesArray));
    setDisplayMessage((prevMessages)=>[...(prevMessages || []), messageWithTimestamp]);
    setTextMessage('');
    setSendImage(false);
}

  return (
    <div className={styles.Main}>
        <div className={styles.upper}>
            <div style={{backgroundColor:`${notesValueListStorage.groupColorCode}`}} className={styles.colorcircle}>
                {shortName}
            </div>
            <p style={{marginLeft:"20px",textTransform:"capitalize",fontFamily:"Roboto",fontWeight:"500",color:"white",fontSize:"18px"}}>{notesValueListStorage.groupName}</p>
        </div>
        <div className={styles.middle}>
            {displayMessage ? displayMessage.map((message,index)=>(
                <div key={index}>
                    <ShowMessages message={message} />
                </div>
            )) : ""}
        </div>
        <div className={styles.bottom}>
            <div className={styles.textareamain}>
                <textarea value={textMessage} onChange={handleChange} placeholder='Enter your text here...........' className={styles.textarea}></textarea>
            </div>
            <div className={styles.submitbutton}>
                <img src={sendImage ? enabledsend : disabledsend} onClick={handleSendMessage}></img>
            </div>
        </div>
    </div>
  )
}

export default RightComponentMessage;