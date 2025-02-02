import React from 'react'
import { useState,useEffect } from 'react';
import styles from './ShowMessages.module.css';
import deleteNote from '/images/delete.png';
import {franc} from 'franc';
import speech from '/images/speech.png';
import 'regenerator-runtime/runtime'

const ShowMessages = ({message,deleteParticularMessage}) => {
    const [showOriginal, setShowOriginal] = useState(true);
    const [translatedText, setTranslatedText] = useState(null);
    const [needsTranslation, setNeedsTranslation] = useState(false);
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslation = async () => {
        if(message && message.text && !translatedText && franc(message.text) !== 'eng'){
          setIsTranslating(true);
          try{
            const response = await fetch('https://pocketnotesbackendproxy.onrender.com/translate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  text: message.text,
                  targetLang: 'en',
                }),
              });
              const result = await response.json();
              setTranslatedText(result.translatedText);
          } 
          catch(error){
            console.error('Error translating message:', error);
          }
          finally{
            setIsTranslating(false);
          }
        }
    };

    const deleteMessage = ()=>{
        deleteParticularMessage(message);
    }

    useEffect(() => {
        if(message && message.text){
            const detectedLang = franc(message.text);
            if(detectedLang !== 'eng' && detectedLang !== 'und'){
              setNeedsTranslation(true);
            } 
            else{
              setNeedsTranslation(false);
            }
        }
        return () => {
          window.speechSynthesis.cancel();
        };

    },[message]);

    const toggleText = () => {
        if(!translatedText){
            handleTranslation();
        }
        setShowOriginal((prev) => !prev);
    };

    const handleSpeech = () => {
        window.speechSynthesis.cancel();
        const textToSpeak = showOriginal ? message.text : translatedText || message.text;
        const lang = showOriginal ? franc(message.text) === 'und' ? 'en-US' : franc(message.text) : 'en-US';
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className={styles.message}>
            <div className={styles.notemessage}>{isTranslating ? 'Translating...' : showOriginal ? message.text : translatedText || message.text}</div>
            <div className={styles.datetime}>
                {needsTranslation && (
                    <div className={styles.toggleTranslation} onClick={toggleText}>
                    {showOriginal ? "Show Translation" : "Show Original"}
                    </div>
                )}
                <img className={styles.deleteIcon} src={deleteNote} onClick={deleteMessage}></img>
                <img src={speech} onClick={handleSpeech} className={styles.speechButton}></img>
                {message.date}&nbsp;&nbsp;&nbsp;&nbsp;&#9679;&nbsp;&nbsp;&nbsp;&nbsp;
                {message.time}
            </div>
        </div>
    )
}

export default ShowMessages;