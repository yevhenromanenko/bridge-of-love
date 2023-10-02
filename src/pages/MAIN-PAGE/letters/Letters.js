import React, {useEffect, useState} from "react";
import './Letters.css'
import UseLocalStorage from "../invites/use-local-storage/UseLocalStorage";
import StartSendLetter from "./start-send-letter/StartSendLetter";
import StopSendLetter from "./stop-send-letter/StopSendLetter";
import GetLetter from "./get-letter/GetLetter";
import LetterForm from "./letter-form/LetterForm";
import MassLetterForm from "./mass-letter-form/MassLetterForm";
import StartSendMassLetter from "./start-send-mass-letter/StartSendMassLetter";
import {BeatLoader} from "react-spinners";
import {override} from "../../override-css/OverRideCss";

const Letters = ({ladyId, onlineUsers, allUsers, banUsers, selectedPhotoUrl, setSelectedPhotoUrl, savedEmails, setSavedEmails, subject, setSubject, emails, letter, setLetter}) => {

    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isSending, setIsSending] = useState(false);
    const [sendingInterval, setSendingInterval] = useState(null);
    const [todayCountLetter, setTodayCountLetter] = UseLocalStorage("todayCountLetter", 0);
    const [lastSavedDateLetter, setLastSavedDateLetter] = UseLocalStorage("lastSavedDateLetter", new Date().toISOString().slice(0, 10));
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [err, setErr] = useState(0)

    const [showMassLetter, setShowMassLetter] = useState(false)
    const [sendingIntervalMassLetter, setSendingIntervalMassLetter] = useState(null);
    const [errMassLetter, setErrMassLetter] = useState(0)
    const [isSendingMassLetter, setIsSendingMassLetter] = useState(false);
    const [selectedPhotoUrlMassLetter, setSelectedPhotoUrlMassLetter] = useState(null); // Добавили состояние для сохранения выбранного фото
    const [subjectMassLetter, setSubjectMassLetter] = useState('');
    const [massLetter, setMassLetter] = useState('');
    const [countMassLetter, setCountMassLetter] = useState(0)

    const handleSendClick = () => {
        setShowEmailForm(!showEmailForm);
    };

    const toggleMassLetter = () => {
        setShowMassLetter(!showMassLetter);
    };

    const startSending = () => {
        if (allUsers.length > 0) {
            StartSendLetter(lastSavedDateLetter, setTodayCountLetter, setLastSavedDateLetter, subject, letter, selectedPhotoUrl, setIsSending, onlineUsers, setErr, setSendingInterval, allUsers);
        } else {
            alert('Чекайте поки завантажуться всі постояльці!')
        }
    }

    const stopSending = () => {
        StopSendLetter(sendingInterval, setIsSending)
    };

    const startSendingMassLetter = () => {
        StartSendMassLetter(setCountMassLetter, subjectMassLetter, massLetter, selectedPhotoUrlMassLetter, setIsSendingMassLetter, setErrMassLetter, setSendingIntervalMassLetter, allUsers, banUsers);
    }

    const stopSendingMassLetter = () => {
        StopSendLetter(sendingIntervalMassLetter, setIsSendingMassLetter)
    };

    useEffect(() => {
        if (allUsers.length > 0) {
            setIsLoading(false);
            GetLetter(setSavedEmails, setSubject, setLetter, setSelectedPhotoUrl, ladyId, emails);
        }
    }, [allUsers]);


    return (
        <div className={'letter-form'}>

            {!isLoading ? (
                <>
                    <button className={'letter-button'} onClick={handleSendClick}>
                        {showEmailForm ? 'Розсилка листів ⬆' : 'Розсилка листів ⬇'}
                    </button>

                    {isSending ? (
                        <button style={{marginLeft: '200px'}}  className={'letter-button'} onClick={stopSending}>Зупинити</button>
                    ) : (
                        <button style={{marginLeft: '200px'}} className={'letter-button'} onClick={startSending} disabled={allUsers.length === 0}>Почати</button>
                    )}

                    <button style={{marginLeft: '20%'}} className={'show-hide-button'} onClick={toggleMassLetter}>
                        {showMassLetter ? 'Сховати ⬆' : 'Масова розсилка ⬇'}
                    </button>

                    <p className="today-count-info">Надіслано сьогодні: {todayCountLetter}, помилки: {err}</p>
                </>
            ) : (
            <>
                <div className={'letter-form'}>
                    <p className={"info-about"}>Спам розсилка легко! "Шаблон" + "Почати розсилку" = "Успіх"!</p>
                    <BeatLoader css={override} size={15} color={"#ececf1"} loading={isLoading} />
                    <p className={"info-about"}>Завантаження постояльців для уникнення проблем з відправкою їм листів зі спаму, зачекайте декілька секунд...</p>
                </div>
            </>
            )}



            {showEmailForm &&
            (<LetterForm
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
            />)}

            {showMassLetter &&
            (<MassLetterForm
                setSubjectMassLetter={setSubjectMassLetter}
                subjectMassLetter={subjectMassLetter}
                setMassLetter={setMassLetter}
                massLetter={massLetter}
                selectedPhotoUrlMassLetter={selectedPhotoUrlMassLetter}
                ladyId={ladyId}
                setSelectedPhotoUrlMassLetter={setSelectedPhotoUrlMassLetter}
                isSendingMassLetter={isSendingMassLetter}
                startSendingMassLetter={startSendingMassLetter}
                stopSendingMassLetter={stopSendingMassLetter}
                countMassLetter={countMassLetter}
                errMassLetter={errMassLetter}
            />)}
        </div>
    );
};

export default Letters;



// нужно добавить кнопку "начать рассылку", при нажатии на кнопку будет срабатывать функция , которая будет выполнять следующие действия:
// 1. проверяет заполнены ли состояния subject, letter, photoUrls
// 2. ставит флаг что началась рассылка
// 3. потом запускается интервал, в котором отправляется вот эти запросы каждые 20-40 секунд:

// fetch("https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=41154", {
//     "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin"
//     },
//     "referrer": "https://www.bridge-of-love.com/index.php?app=chat&user_id=0",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "GET",
//     "mode": "cors",
//     "credentials": "include"
// });
//
// const form = new FormData();
//
// form.append('msg_subject', 'I hope you enjoy this letter and I can seem wise to you and touch your heart.');
// form.append('ria_key', '121.21.11.11.71.8.200.24.3.5.476.27');
// form.append('77521ba9c32', '7d57736b29ba077521ba9c32');
// form.append('0ca2e3367ac6daafb66e0b3a4ea', 'MTY5MTUwMTU1MA==');
// form.append('phone_id', '');
// form.append('to_user_id', '17926');
// form.append(
//     'msg_content',
//     '<span style="font-family: verdana,geneva; font-size: 1.06em;"> ... (your HTML content) ... </span>'
// );
// form.append('video_id', '0');
//
// axios.post('https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=17926', form, {
//     headers: {
//         ...form.getHeaders(),
//         accept: 'application/json, text/plain, */*',
//         'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
//         'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
//         'sec-ch-ua-mobile': '?0',
//         'sec-ch-ua-platform': '"macOS"',
//         'sec-fetch-dest': 'empty',
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'same-origin',
//     },
//     referrer: 'https://www.bridge-of-love.com/index.php?app=chat&user_id=0',
//     referrerPolicy: 'strict-origin-when-cross-origin',
//     withCredentials: true,
// })

//
// <h1>Отправить сообщение</h1>
// <form className="r5 gray_bg m-b-18 m-b-18" method="post" encType="multipart/form-date" id="send_message_form">
//     <h2>Сообщение</h2>
//     <div style="padding-bottom:18px;">
//         <div className="f_l g_position">
//             <input type="text" className="beta" name="msg_subject" id="msg_subject" value="Тема сообщения"/>
//         </div>
//         <div className="clearfix"></div>
//     </div>
//     <input type="hidden" name="ria_key" value="108.22.4.10.72.16.464.16.3.4.542.28"/>
//     <input type="hidden" name="7521ba9c32" value="29ba077521ba9c32"/>
//     <input type="hidden" name="bc0aec3cf50e935d6a76002bcfef" value="MTY5MTU4OTg1MA=="/>
//     <span style="display:none;visibility:hidden;">



// fetch("https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=17926", {
//     "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
//         "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryA8Pmd6bkSOceIEAx",
//         "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"115\", \"Chromium\";v=\"115\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin"
//     },
//     "referrer": "https://www.bridge-of-love.com/index.php?app=chat&user_id=0",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"msg_subject\"\r\n\r\nI hope you enjoy this letter and I can seem wise to you and touch your heart.\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"ria_key\"\r\n\r\n121.21.11.11.71.8.200.24.3.5.476.27\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"77521ba9c32\"\r\n\r\n7d57736b29ba077521ba9c32\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"0ca2e3367ac6daafb66e0b3a4ea\"\r\n\r\nMTY5MTUwMTU1MA==\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"phone_id\"\r\n\r\n\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"to_user_id\"\r\n\r\n17926\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"msg_content\"\r\n\r\n<span style=\"font-family: verdana,geneva; font-size: 1.06em;\">hello dear, Glenn<br /><br />Are you curious about who I am and what I'm looking for on this site? I have been on this site for a long time, but I have not used it for several months, because I have already lost faith in love, can you help me? Do you still believe in love and passion, or are you also tired of the virtual? Are there many women on this site seeking your attention?<br />I don't even know if I can get your attention and if I'll be better than your other women. But I'll risk it, won't you be angry? It's just my next attempt and faith in love. Young and naive ladies always believe in love, but men of your age should not give up either. How long have you been alone? Do you live alone? do you have any pets? Sorry for so many questions!<br /><br />I know that, as yet, I am nothing to you. And you don't have to write to me and read my letters. But I will be very sad if we do not communicate and develop our relationship. Who do you think will be to blame for this?<br /> I know that I am young, maybe a little inexperienced and there is nothing special about me. But I can become your special woman, I can take care of you, be there for you and fulfill the desire of a friend of a friend! Isn't that what you want? Or have you simply stopped believing in love and feminine sincerity?<br /><br />Oh, today my dad said that young modern girls have become very spoiled, they have become materialistic, cunning and arrogant. They only need money, travel and entertainment, every year fewer women have a large family, one man for life. But this is not about me, I was brought up quite differently.<br />From childhood, my parents taught me that I should find my only wise man, he should be mature, older than me, kind and caring.<br /><br />But my years went by just as quickly. I know what kind of woman I have to be for a man to make him happy. When will you give us a chance and probably show me how gentle and caring I can be? Men are often divided into 2 types who want passion and lust, and who need gentle and caring women. What kind of woman do you want?<br />I really want to combine these qualities and give you vivid emotions.<br />How are these days going now? How are things in the United states? Everything is the same here in Ukraine, except that every day we sit here without electricity for several hours, which makes me very depressed. I would like to live in a future house and cook dinner for you. Shall we make an appointment?<br /><br />Diana</span><br /> <p class=\"thumb\" style=\"text-align: center;\"><img class=\"imageMes\" src=\"data/files/images/lady/maill/user_125166/202210290222355755.jpg\" border=\"0\" width=\"300\" /></p><br /> <p class=\"thumb\" style=\"text-align: center;\"><img class=\"imageMes\" src=\"data/files/images/lady/maill/user_125166/202210030242411417.jpg\" border=\"0\" width=\"300\" /></p><br /> <p class=\"thumb\" style=\"text-align: center;\"><img class=\"imageMes\" src=\"data/files/images/lady/maill/user_125166/202210030242417283.jpg\" border=\"0\" width=\"300\" /></p>\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx\r\nContent-Disposition: form-data; name=\"video_id\"\r\n\r\n0\r\n------WebKitFormBoundaryA8Pmd6bkSOceIEAx--\r\n",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });

// ...............
// нужно добавить кнопку "начать рассылку", при нажатии на кнопку будет срабатывать функция , которая будет выполнять следующие действия:
//     1. проверяет заполнены ли состояния subject, letter, photoUrls
// 2. ставит флаг что началась рассылка
// 3. потом запускается интервал, в котором отправляется вот этот запрос каждые 20-40 секунд:
//
//     const form = new FormData();
//
// form.append('msg_subject', `${subject}`);
// form.append('ria_key', '121.21.11.11.71.8.200.24.3.5.476.27');
// form.append('77521ba9c32', '7d57736b29ba077521ba9c32');
// form.append('0ca2e3367ac6daafb66e0b3a4ea', 'MTY5MTUwMTU1MA==');
// form.append('phone_id', '');
// form.append('to_user_id', '17926');
// form.append(
//     'msg_content',
//     `<span style="font-family: verdana,geneva; font-size: 1.06em;">${letter}<br/><p class="thumb" style="text-align: center;"><img class="imageMes" src=`${selectedPhotoUrl}` border="0" width="300" /></p></span>`
// );
// form.append('video_id', '0');
//
// axios.post('https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=17926', form)
