import React, {useState} from "react";
import HandleTagButtonClick from "../../handle-tag-button-click/HandleTagButtonClick";
import GetPhotos from "../get-photos/GetPhotos";
import HandleSaveLetter from "../handle-save-letter/HandleSaveLetter";
import '../Letters.css'

const LetterForm = ({setSubject, subject, setLetter, letter, selectedPhotoUrl, ladyId, setSelectedPhotoUrl, savedEmails, setSavedEmails, emails}) => {

    const [showPhoto, setShowPhoto] = useState(false);

    const handlePhotoClick = () => {
        setShowPhoto(!showPhoto);
    };

    const handleSaveClick = () => {
        HandleSaveLetter(ladyId, subject, letter, selectedPhotoUrl, savedEmails, setSavedEmails, setSubject, setLetter, setSelectedPhotoUrl, emails);
    }

    return (
        <>
            <div style={{borderTop: '1px solid #ddd'}}>
                <div style={{marginTop: '5px'}} className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'subject', setSubject, subject)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'subject', setSubject, subject)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'subject', setSubject, subject)}>Країна</button>
                </div>
                <textarea
                    placeholder="Тема письма"
                    className={'subject-letter'}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <br/>

                <div className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'letter', setLetter, letter)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'letter', setLetter, letter)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'letter', setLetter, letter)}>Країна</button>
                </div>
                <textarea
                    placeholder="Письмо"
                    className={'content-letter'}
                    value={letter}
                    onChange={(e) => setLetter(e.target.value)}
                />
                <br/>
                <button className={'letter-button'} onClick={handlePhotoClick}>
                    {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}
                </button>
                <button style={{marginLeft: '200px'}} className={'letter-button'} onClick={handleSaveClick}>Зберегти лист</button>

                <br/>
                {selectedPhotoUrl &&
                <>
                    <p style={{fontSize: "16px", color: '#ececf1', marginTop: "5px", marginBottom: '5px'}}>Обране фото:</p>
                    <img className={'img-in-letter'} src={`https://www.bridge-of-love.com/${selectedPhotoUrl}`}/>
                </>
                }
                <br/>
                {showPhoto && ( ladyId.length > 0 ?
                        <GetPhotos
                            ladyId={ladyId}
                            selectedPhotoUrl={selectedPhotoUrl}
                            setSelectedPhotoUrl={setSelectedPhotoUrl}
                        /> :
                        null
                )}
            </div>
        </>
    )
}

export default LetterForm;
