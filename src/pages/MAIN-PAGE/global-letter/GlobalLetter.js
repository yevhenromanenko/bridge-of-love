import React, {useEffect, useState} from "react";
import LetterForm from "../letters/letter-form/LetterForm";
import {BeatLoader} from "react-spinners";
import {override} from "../../override-css/OverRideCss";
import GetLetter from "../letters/get-letter/GetLetter";
import StartSendLetter from "../letters/start-send-letter/StartSendLetter";
import UseLocalStorage from "../invites/use-local-storage/UseLocalStorage";
import StopSendLetter from "../letters/stop-send-letter/StopSendLetter";

const GlobalLetter = ({ladyId, allUsers, selectedPhotoUrl, setSelectedPhotoUrl, savedEmails, setSavedEmails, subject, setSubject, emails, letter, setLetter, usersGlobal, isLoading}) => {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isSendingGlobal, setIsSendingGlobal] = useState(false);
    const [lastSavedDateGlobalLetter, setLastSavedDateGlobalLetter] = UseLocalStorage("lastSavedDateGlobalLetter", new Date().toISOString().slice(0, 10));
    const [todayCountGlobalLetter, setTodayCountGlobalLetter] = UseLocalStorage("todayCountGlobalLetter", 0);
    const [errGlobal, setErrGlobal] = useState(0)
    const [sendingIntervalGlobal, setSendingIntervalGlobal] = useState(null);

    const handleSendClick = () => {
        setShowEmailForm(!showEmailForm);
    };

    const startSendingGlobal = () => {
        if (usersGlobal.length > 0) {
            StartSendLetter(lastSavedDateGlobalLetter, setTodayCountGlobalLetter, setLastSavedDateGlobalLetter, subject, letter, selectedPhotoUrl, setIsSendingGlobal, usersGlobal, setErrGlobal, setSendingIntervalGlobal, allUsers);
        } else {
            alert('Чекайте поки завантажуться всі чоловіки!')
        }
    }

    const stopSendingGlobal = () => {
        StopSendLetter(sendingIntervalGlobal, setIsSendingGlobal)
    };

    useEffect(() => {
        if (!isLoading) {
            GetLetter(setSavedEmails, setSubject, setLetter, setSelectedPhotoUrl, ladyId, emails);
        }
    }, [isLoading]);


    return (
        <>
            {!isLoading ? (
                <>
                    <div className={'letter-form'}>
                        <p className={"info-about"}>Глобальна розсилка - це спам розсилка по всім активним чоловікам на сайті, крім ваших постояльців! Знайдено чоловіків: {usersGlobal.length}!</p>
                        <button className={'show-hide-button'} onClick={handleSendClick}>
                            {showEmailForm ? 'Глобальна розсилка ⬆' : 'Глобальна розсилка ⬇'}
                        </button>
                        {isSendingGlobal ? (
                            <button className={'letter-button-letter'} onClick={stopSendingGlobal}>Зупинити розсилку</button>
                        ) : (
                            <button className={'letter-button-letter'} onClick={startSendingGlobal}>Почати розсилку</button>
                        )}
                        <span className={"info-about"}>Надіслано: {todayCountGlobalLetter}/{usersGlobal.length}, помилки: {errGlobal}</span>

                        {showEmailForm && (
                            <>
                                <p className={"info-about"}>Глобальна розсилка - це спам розсилка! Її плюс у тому, що розсилка робиться по всіх чоловіках, які відвідували сайт останнім часом та цікавилися вашим профілем! Не тільки тим, хто онлайн!</p>
                                <LetterForm
                                    setSubject={setSubject}
                                    subject={subject}
                                    setLetter={setLetter}
                                    letter={letter}
                                    selectedPhotoUrl={selectedPhotoUrl}
                                    ladyId={ladyId}
                                    setSelectedPhotoUrl={setSelectedPhotoUrl}
                                    setSavedEmails={setSavedEmails}
                                    savedEmails={savedEmails}
                                    emails={emails}
                                />
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={'letter-form'}>
                        <p className={"info-about"}>Глобальна розсилка - це спам розсилка! Її плюс у тому, що розсилка робиться по всіх чоловіках, які відвідували сайт останнім часом та цікавилися вашим профілем! Не тільки тим, хто онлайн!</p>
                        <BeatLoader css={override} size={15} color={"#ececf1"} loading={isLoading} />
                        <p className={"info-about"}>Завантаження користувачів... {usersGlobal.length}!</p>
                    </div>
                </>
            )
            }
        </>
    )

}
export default GlobalLetter;
