import React, {useEffect, useState} from "react";
import GetBDayUsers from "./get-bday-users/GetBDayUsers";
import GetLetter from "../get-letter/GetLetter";
import SendLetterToBDayUsers from "./get-bday-users/SendLetterToBDayUsers";
import StopSendLetter from "../stop-send-letter/StopSendLetter";
import LetterForm from "../letter-form/LetterForm";
import {BeatLoader} from "react-spinners";
import '../Letters.css'
import {override} from "../../../override-css/OverRideCss";

const BDayUsers = ({ladyId}) => {

    const [show, setShow] = useState(false);
    const [subjectBDay, setSubjectBDay] = useState('');
    const [letterBDay, setLetterBDay] = useState('');
    const [selectedPhotoUrlBDay, setSelectedPhotoUrlBDay] = useState(null);
    const [savedEmailsBDay, setSavedEmailsBDay] = useState([])
    const [isSendingBDay, setIsSendingBDay] = useState(false);
    const [sendingIntervalBDay, setSendingIntervalBDay] = useState(null);
    const [countLetterBDay, setCountBDay] = useState(0)
    const [errBDay, setErrBDay] = useState(0)
    const [fromBDay, setFromBDay] = useState(0)
    const emailsBDay = 'emails-b-day'

    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const usersBDay = GetBDayUsers(setIsLoading);

    const todayDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2.$1.$3");

    const handleClick = () => {
        setShow(!show);
    };
    // подгружаем шаблоны из локал сторедж
    useEffect(() => {
        if (!isLoading) {
            GetLetter(setSavedEmailsBDay, setSubjectBDay, setLetterBDay, setSelectedPhotoUrlBDay, ladyId, emailsBDay);
        }
    }, [isLoading]);

    const startSendingBDay = async () => {
        SendLetterToBDayUsers(subjectBDay, letterBDay, selectedPhotoUrlBDay, setIsSendingBDay, setSendingIntervalBDay, usersBDay, setErrBDay, setCountBDay, setFromBDay);
    };

    const stopSendingBDay = () => {
        StopSendLetter(sendingIntervalBDay, setIsSendingBDay)
    };

    return (
        <>
            {!isLoading ? (
                <>
                    <div className={'letter-form'}>
                        <p className={"info-about"}>Вітайте чоловіків з ДНЕМ НАРОДЖЕННЯ легко! "Шаблон" + "Почати розсилку" = "Успіх"!</p>
                        <button className={'show-hide-button'} onClick={handleClick}>
                            {show ? 'День Народження ⬆' : 'День Народження ⬇'}
                        </button>
                        {isSendingBDay ? (
                            <button className={'letter-button-letter'} onClick={stopSendingBDay}>Зупинити розсилку</button>
                        ) : (
                            <button className={'letter-button-letter'} onClick={startSendingBDay}>Почати розсилку</button>
                        )}
                        <span className={"info-about"}>Надіслано: {countLetterBDay}/{fromBDay}, помилки: {errBDay}</span>

                        {show && (
                            <>
                                <p className={"info-about"}>Це розсилка для чоловіків, у яких ДЕНЬ НАРОЖДЕННЯ - {todayDate}. Створіть шаблон, збережіть його та надсилайте кожен день.</p>
                                <LetterForm
                                    setSubject={setSubjectBDay}
                                    subject={subjectBDay}
                                    setLetter={setLetterBDay}
                                    letter={letterBDay}
                                    selectedPhotoUrl={selectedPhotoUrlBDay}
                                    ladyId={ladyId}
                                    setSelectedPhotoUrl={setSelectedPhotoUrlBDay}
                                    setSavedEmails={setSavedEmailsBDay}
                                    savedEmails={savedEmailsBDay}
                                    emails={emailsBDay}
                                />
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                <div className={'letter-form'}>
                    <p className={"info-about"}>Вітайте чоловіків з ДНЕМ НАРОДЖЕННЯ легко! "Шаблон" + "Почати розсилку" = "Успіх"!</p>
                    <BeatLoader css={override} size={15} color={"#ececf1"} loading={isLoading} />
                    <p className={"info-about"}>Завантаження користувачів...</p>
                </div>
                </>
                )
            }
            </>
        )
}

export default BDayUsers;
