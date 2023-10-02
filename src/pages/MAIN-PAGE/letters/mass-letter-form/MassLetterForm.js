import React, {useState} from "react";
import HandleTagButtonClick from "../../handle-tag-button-click/HandleTagButtonClick";
import GetPhotos from "../get-photos/GetPhotos";
import '../Letters.css'

const MassLetterForm = ({setSubjectMassLetter, subjectMassLetter, setMassLetter, massLetter, ladyId, isSendingMassLetter, startSendingMassLetter, stopSendingMassLetter, selectedPhotoUrlMassLetter, setSelectedPhotoUrlMassLetter, countMassLetter, errMassLetter}) => {

    const [showPhoto, setShowPhoto] = useState(false);

    const handlePhotoClick = () => {
        setShowPhoto(!showPhoto);
    };

    return (
        <>
            <div style={{borderTop: '1px solid #ddd'}}>
                <div style={{marginTop: '5px'}} className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'subjectMassLetter', setSubjectMassLetter, subjectMassLetter)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'subjectMassLetter', setSubjectMassLetter, subjectMassLetter)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'subjectMassLetter', setSubjectMassLetter, subjectMassLetter)}>Країна</button>
                </div>
                <textarea
                    placeholder="Тема письма"
                    className={'subject-letter'}
                    value={subjectMassLetter}
                    onChange={(e) => setSubjectMassLetter(e.target.value)}
                />
                <br/>

                <div className="tag-buttons">
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Name%', 'massLetter', setMassLetter, massLetter)}>Ім'я</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Age%', 'massLetter', setMassLetter, massLetter)}>Вік</button>
                    <button className="tag-button-letter" onClick={() => HandleTagButtonClick('%Country%', 'massLetter', setMassLetter, massLetter)}>Країна</button>
                </div>
                <textarea
                    placeholder="Письмо"
                    className={'content-letter'}
                    value={massLetter}
                    onChange={(e) => setMassLetter(e.target.value)}
                />
                <br/>
                <button className={'letter-button'} onClick={handlePhotoClick}>
                    {showPhoto ? 'Фото ⬆' : 'Фото ⬇'}
                </button>

                {isSendingMassLetter ? (
                    <button style={{marginLeft: '200px'}}  className={'letter-button'} onClick={stopSendingMassLetter}>Зупинити</button>
                ) : (
                    <button style={{marginLeft: '200px'}} className={'letter-button'} onClick={startSendingMassLetter}>Почати</button>
                )}

                <p className="today-count-info">Надіслано сьогодні: {countMassLetter}, помилки: {errMassLetter}</p>


                <br/>
                {selectedPhotoUrlMassLetter &&
                <>
                    <p style={{fontSize: "16px", color: '#ececf1', marginTop: "5px", marginBottom: '5px'}}>Обране фото:</p>
                    <img className={'img-in-letter'} src={`https://www.bridge-of-love.com/${selectedPhotoUrlMassLetter}`}/>
                </>
                }
                <br/>
                {showPhoto && ( ladyId.length > 0 ?
                        <GetPhotos
                            ladyId={ladyId}
                            selectedPhotoUrl={selectedPhotoUrlMassLetter}
                            setSelectedPhotoUrl={setSelectedPhotoUrlMassLetter}
                        /> :
                        null
                )}
            </div>
        </>
    )
}

export default MassLetterForm;
