import React, {useEffect, useState} from "react";
import { BeatLoader } from "react-spinners";
import './ExtraMailing.css'
import LetterForm from "../letter-form/LetterForm";
import GetLetter from "../get-letter/GetLetter";
import StartSendingExtraLetters from "./StartSending";
import StopSendLetter from "../stop-send-letter/StopSendLetter";
import {override} from "../../../override-css/OverRideCss";

const ExtraMailing = ({data, ladyId, allUsers}) => {

    const [selectedType, setSelectedType] = useState(null);

    const [subjectPhoto, setSubjectPhoto] = useState('');
    const [letterPhoto, setLetterPhoto] = useState('');
    const [selectedPhotoUrlPhoto, setSelectedPhotoUrlPhoto] = useState(null);
    const [savedEmailsPhoto, setSavedEmailsPhoto] = useState([])
    const [isSendingPhoto, setIsSendingPhoto] = useState(false);
    const [sendingIntervalPhoto, setSendingIntervalPhoto] = useState(null);
    const [countLetterPhoto, setCountPhoto] = useState(0)
    const [errPhoto, setErrPhoto] = useState(0)
    const [fromPhoto, setFromPhoto] = useState(0)
    const emailsPhoto = 'emails-photo'
    const selectedTypePhoto = 'foto'

    const [subjectWiev, setSubjectWiev] = useState('');
    const [letterWiev, setLetterWiev] = useState('');
    const [selectedPhotoUrlWiev, setSelectedPhotoUrlWiev] = useState(null);
    const [savedEmailsWiev, setSavedEmailsWiev] = useState([])
    const [isSendingWiev, setIsSendingWiev] = useState(false);
    const [sendingIntervalWiev, setSendingIntervalWiev] = useState(null);
    const [countLetterWiev, setCountWiev] = useState(0)
    const [errWiev, setErrWiev] = useState(0)
    const [fromWiev, setFromWiev] = useState(0)
    const emailsWiev = 'emails-wiev';
    const selectedTypeWiev = 'wiev'

    const [subjectReadLetter, setSubjectReadLetter] = useState('');
    const [letterReadLetter, setLetterReadLetter] = useState('');
    const [selectedPhotoUrlReadLetter, setSelectedPhotoUrlReadLetter] = useState(null);
    const [savedEmailsReadLetter, setSavedEmailsReadLetter] = useState([])
    const [isSendingReadLetter, setIsSendingReadLetter] = useState(false);
    const [sendingIntervalReadLetter, setSendingIntervalReadLetter] = useState(null);
    const [countLetterReadLetter, setCountReadLetter] = useState(0)
    const [errReadLetter, setErrReadLetter] = useState(0)
    const [fromReadLetter, setFromReadLetter] = useState(0)
    const emailsReadLetter = "emails-read-letter"
    const selectedTypeReadLetter = 'read_message'

    const [isLoading, setIsLoading] = useState(true); // Add loading state

    const toggleDiv = (icon) => {
        setSelectedType(prevType => (prevType === icon ? null : icon));
    };

    // подгружаем шаблоны из локал сторедж
    useEffect(() => {
        if (data.length >= 480) {
            setIsLoading(false);
            GetLetter(setSavedEmailsPhoto, setSubjectPhoto, setLetterPhoto, setSelectedPhotoUrlPhoto, ladyId, emailsPhoto);
            GetLetter(setSavedEmailsWiev, setSubjectWiev, setLetterWiev, setSelectedPhotoUrlWiev, ladyId, emailsWiev);
            GetLetter(setSavedEmailsReadLetter, setSubjectReadLetter, setLetterReadLetter, setSelectedPhotoUrlReadLetter, ladyId, emailsReadLetter);
        }
    }, [data]);

    const startSendingPhoto = async () => {
        StartSendingExtraLetters(subjectPhoto, letterPhoto, selectedPhotoUrlPhoto, selectedTypePhoto, setIsSendingPhoto, setSendingIntervalPhoto, data, allUsers, setErrPhoto, setCountPhoto, setFromPhoto);
    };

    const stopSendingPhoto = () => {
        StopSendLetter(sendingIntervalPhoto, setIsSendingPhoto)
    };

    const startSendingWiev = async () => {
        StartSendingExtraLetters(subjectWiev, letterWiev, selectedPhotoUrlWiev, selectedTypeWiev, setIsSendingWiev, setSendingIntervalWiev, data, allUsers, setErrWiev, setCountWiev, setFromWiev);
    };

    const stopSendingWiev = () => {
        StopSendLetter(sendingIntervalWiev, setIsSendingWiev)
    };

    const startSendingReadLetter = async () => {
        StartSendingExtraLetters(subjectReadLetter, letterReadLetter, selectedPhotoUrlReadLetter, selectedTypeReadLetter, setIsSendingReadLetter, setSendingIntervalReadLetter, data, allUsers, setErrReadLetter, setCountReadLetter, setFromReadLetter);
    };

    const stopSendingReadLetter = () => {
        StopSendLetter(sendingIntervalReadLetter, setIsSendingReadLetter)
    };

    return (
        <div>
            {!isLoading ? (
                <>
                    <div className={'letter-form'}>

                        {/*ФОТО*/}
                        <button className={'show-hide-button'} onClick={() => toggleDiv(selectedTypePhoto)}>
                            {selectedType === 'foto' ? 'Додав фото ⬆' : 'Додав фото ⬇'}
                        </button>
                        {isSendingPhoto ? (
                            <button className={'letter-button-extra'} onClick={stopSendingPhoto}>Зупинити</button>
                        ) : (
                            <button className={'letter-button-extra'} onClick={startSendingPhoto}>Почати</button>
                        )}
                        <span className={"info-about"}>Надіслано: {countLetterPhoto}/{fromPhoto}, помилки: {errPhoto}</span>

                        {/*СМОТРЕЛ ПРОФИЛЬ*/}
                        <button className={'show-hide-button-send'} onClick={() => toggleDiv(selectedTypeWiev)}>
                            {selectedType === 'wiev' ? 'Дивився профіль ⬆' : 'Дивився профіль ⬇'}
                        </button>
                        {isSendingWiev ? (
                            <button className={'letter-button-extra'} onClick={stopSendingWiev}>Зупинити</button>
                        ) : (
                            <button className={'letter-button-extra'} onClick={startSendingWiev}>Почати</button>
                        )}
                        <span className={"info-about"}>Надіслано: {countLetterWiev}/{fromWiev}, помилки: {errWiev}</span>

                       {/*ПРОЧИТАЛ ПИСЬМО*/}
                        <button className={'show-hide-button-send'} onClick={() => toggleDiv(selectedTypeReadLetter)}>
                            {selectedType === 'read_message' ? 'Прочитав лист ⬆' : 'Прочитав лист ⬇'}
                        </button>
                        {isSendingReadLetter ? (
                            <button className={'letter-button-extra'} onClick={stopSendingReadLetter}>Зупинити</button>
                        ) : (
                            <button className={'letter-button-extra'} onClick={startSendingReadLetter}>Почати</button>
                        )}
                        <span className={"info-about"}>Надіслано: {countLetterReadLetter}/{fromReadLetter}, помилки: {errReadLetter}</span>

                        {selectedType === 'foto' && (
                            <>
                                <p className={"info-about"}>Це розсилка для чоловіків, які нещодавно додали фото у свій профіл, за вийнятком постояльців, тобто які стають потенційними користувачами сайту. Створіть шаблон, збережіть його та надсилайте.</p>
                                <LetterForm
                                setSubject={setSubjectPhoto}
                                subject={subjectPhoto}
                                setLetter={setLetterPhoto}
                                letter={letterPhoto}
                                selectedPhotoUrl={selectedPhotoUrlPhoto}
                                ladyId={ladyId}
                                setSelectedPhotoUrl={setSelectedPhotoUrlPhoto}
                                setSavedEmails={setSavedEmailsPhoto}
                                savedEmails={savedEmailsPhoto}
                                emails={emailsPhoto}
                                />
                            </>
                        )}

                        {selectedType === 'wiev' && (
                            <>
                                <p className={"info-about"}>Це розсилка для чоловіків, які нещодавно дивились ваш профіль, за вийнятком постояльців, створіть шаблон, збережіть його та надсилайте.</p>
                                <LetterForm
                                    setSubject={setSubjectWiev}
                                    subject={subjectWiev}
                                    setLetter={setLetterWiev}
                                    letter={letterWiev}
                                    selectedPhotoUrl={selectedPhotoUrlWiev}
                                    ladyId={ladyId}
                                    setSelectedPhotoUrl={setSelectedPhotoUrlWiev}
                                    setSavedEmails={setSavedEmailsWiev}
                                    savedEmails={savedEmailsWiev}
                                    emails={emailsWiev}
                                />
                            </>
                        )}

                        {selectedType === 'read_message' && (
                            <>
                                <p className={"info-about"}>Це розсилка для чоловіків, які нещодавно прочитали лист від вас, за вийнятком постояльців, тобто які мають інтерес до вашого профайлу, але з ними ніколи не було переписки. Створіть шаблон, збережіть його та надсилайте!</p>
                                <LetterForm
                                    setSubject={setSubjectReadLetter}
                                    subject={subjectReadLetter}
                                    setLetter={setLetterReadLetter}
                                    letter={letterReadLetter}
                                    selectedPhotoUrl={selectedPhotoUrlReadLetter}
                                    ladyId={ladyId}
                                    setSelectedPhotoUrl={setSelectedPhotoUrlReadLetter}
                                    setSavedEmails={setSavedEmailsReadLetter}
                                    savedEmails={savedEmailsReadLetter}
                                    emails={emailsReadLetter}
                                />
                            </>
                        )}
                    </div>

                    {/* Аналогично для остальных типов рассылки */}
                </>
            ) : (
                <div className={'letter-form'}>
                    <p className={"info-about"}>Екстра-розсилка, для збільшення кількості отриманих листів.</p>
                    <BeatLoader css={override} size={15} color={"#ececf1"} loading={isLoading} />
                    <p className={"info-about"}>Завантаження користувачів... {data.length}</p>
                </div>
            )}
        </div>
    );
}

export default ExtraMailing;
