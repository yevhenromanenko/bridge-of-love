import React, {useEffect, useRef, useState} from "react";
import ConnectWebSocket from "./connect-web-socket/ConnectWebSocket";
import StartSendingInvites from "./start-sending-invite/StartSendingInvites";
import StopSendingInvites from "./stop-sending-invites/StopSendingInvites";
import GetWordEnding from "../get-word-ending/GetWordEnding";
import "./invites.css";
import './log-invites/LogInvites.css'
import UseLocalStorage from "./use-local-storage/UseLocalStorage";
import AllInvitesForSending from "./all-invites-for-sending/AllInvitesForSending";
import PersonalInvite from "./personal-invite/PersonalInvite";
import {BeatLoader} from "react-spinners";
import {override} from "../../override-css/OverRideCss";

const Invites = ({onlineUsers, log, setLog, allUsers, img}) => {

    const socket = useRef({});
    const [isSending, setIsSending] = useState(false);
    const [messageInterval, setMessageInterval] = useState(null);
    const [isConnectSocket, setIsConnectSocket] = useState(false);
    const [allowReconnect, setAllowReconnect] = useState(true);
    const whoViewProfile = useRef([]);
    const whoGetAnswer = useRef([]);
    const [isNewChat, setIsNewChat] = useState(false);
    const [todayCount, setTodayCount] = UseLocalStorage("todayCount", 0);
    const [lastSavedDate, setLastSavedDate] = UseLocalStorage("lastSavedDate", new Date().toISOString().slice(0, 10));
    const [errorMessage, setErrorMessage] = useState('');
    const [err, setErr] = useState(0)
    const [chat, setChat] = useState(0)

    const invites = AllInvitesForSending();
    const personalInvite = PersonalInvite();

    const handleStartSending = () => {
        if (!isConnectSocket && allowReconnect) {
            ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setChat, img);
        }
        if (allUsers.length > 0) {
            StartSendingInvites(invites, personalInvite, lastSavedDate, setLastSavedDate, setMessageInterval, setIsSending, isNewChat, onlineUsers, socket, setTodayCount, todayCount, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setLog, log, setErr, setChat, allUsers);
        } else {
            alert('Чекайте поки завантажуться всі постояльці!')
        }
    };

    const handleStopSending = () => {
        setAllowReconnect(false); // Устанавливаем флаг, запрещая повторное подключение после остановки
        StopSendingInvites(socket, messageInterval, setIsSending, setMessageInterval, setIsConnectSocket, setErrorMessage);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            socket.current?.send('{"type":"set online"}');
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Запуск подключения при монтировании компонента
        ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setChat, img);
        return () => {
            socket.current.close();
        };

    }, [])

    // Устанавливаем флаг разрешения повторного подключения обратно в true после закрытия вебсокета
    useEffect(() => {
        if (!isConnectSocket) {
            setAllowReconnect(true);
        }
    }, [isConnectSocket]);


    return (
        <>
            <div className="invites-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                { allUsers.length === 0 &&
                <>
                    <div className={'letter-form'}>
                        <BeatLoader css={override} size={15} color={"#ececf1"} loading={allUsers.length === 0} />
                    </div>
                </>
                }

                {onlineUsers.length > 0 && allUsers.length > 0 && !isSending && <p className="online-users-info">Можно починати відправку інвайтів! Відправка зупинена</p>}
                {onlineUsers.length > 0 && allUsers.length > 0 && isSending && <p className="online-users-info">Відправка увімкнена! Онлайн: {onlineUsers.length} {GetWordEnding(onlineUsers.length)}, постояльці: {allUsers.length}</p>}

                {isSending ? (
                    <button className="start-stop-button" onClick={handleStopSending}>Зупинити розсилку</button>
                ) : (
                    <button className="start-stop-button" onClick={handleStartSending} disabled={allUsers.length === 0}>Почати розсилку</button>
                )}
                <p className="today-count-info">Надіслано сьогодні: {todayCount}, помилки: {err}, чат: {chat}</p>
            </div>
        </>
    );
}

export default Invites;
