import { useEffect,useState} from 'react';
import styles from './ShowCreatedNotes.module.css'
import 'regenerator-runtime/runtime'

const ShowCreatedNotes = ({note,notesValueListStorage,isSelected,onSelect}) => {
const [shortName,setShortName] = useState();
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
    
        var nickName = createNickName(note);
        setShortName(nickName)    
    },[note])

  return (
    <div className={styles.noteitem} style={{backgroundColor : isSelected ? "#2F2F2F2B" : "white"}} onClick={onSelect}>
        <div style={{backgroundColor:`${notesValueListStorage.groupColorCode}`}} className={styles.colorcircle}>
            {shortName}
        </div>
        <p style={{marginLeft:"30px",textTransform:"capitalize",fontFamily:"Roboto",fontWeight:"600"}}>{notesValueListStorage.groupName}</p>
    </div>
  )
}
export default ShowCreatedNotes;