import React from 'react'
import styles from './ShowMessages.module.css'
const ShowMessages = ({message}) => {
    return (
        <div className={styles.message}>
            <div className={styles.notemessage}>{message.text}</div>
            <div className={styles.datetime}>
                {message.date}&nbsp;&nbsp;&nbsp;&nbsp;&#9679;&nbsp;&nbsp;&nbsp;&nbsp;
                {message.time}
            </div>
        </div>
    )
}

export default ShowMessages;