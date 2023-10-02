import SendInviteToUser from "../send-invite-to-user/SendInviteToUser";
import ConnectWebSocket from "../connect-web-socket/ConnectWebSocket";
import LogInvites from "../log-invites/LogInvites";
import ReplaceTagsLetter from "../../letters/replace-tags-letter/ReplaceTagsLetter";
import CheckForForbiddenTags from "../../check-for-forbidden-tags/CheckForForbiddenTags";

const StartSendingInvites = (invites, personalInvite, lastSavedDate, setLastSavedDate, setMessageInterval, setIsSending, isNewChat, onlineUsers, socket, setTodayCount, todayCount, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setLog, log, setErr, setChat, allUsers) => {

    const isSameDate = (date1, date2) => date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10);
    const currentDate = new Date();
    if (!isSameDate(currentDate, new Date(lastSavedDate))) {
        // Если текущая дата отличается от сохраненной даты, обнуляем счетчик
        setTodayCount(0);
        // Записываем текущую дату в локальное хранилище
        setLastSavedDate(currentDate.toISOString());
    }

    if (personalInvite.length === 0) {
        alert("Додайте хоча б один персональний інвайт для постояльців!");
        return;
    }

    if (invites.length === 0) {
        alert("Додайте хоча б один інвайт для розсилки!");
        return;
    }

    setIsSending(true);

    // Запускаем отправку инвата каждые 5-7 секунды
    const newInterval = setInterval(async () => {

        if (isNewChat) {
            setChat(chat => chat + 1)
            console.log('начался чат')
        }

        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const randomInvite = invites[Math.floor(Math.random() * invites.length)];
        const randomPersonalInvite = personalInvite[Math.floor(Math.random() * personalInvite.length)];

        const replaceInvite = ReplaceTagsLetter(randomInvite.text, randomUser)
        const personalInviteToSend = ReplaceTagsLetter(randomPersonalInvite.text, randomUser);

        if (replaceInvite === undefined || personalInviteToSend === undefined) {
            setErr(err => err + 1)
            console.log('інвайт не знайдено')
            return;
        }

        // console.log(socket.current.readyState, 'status')
        const hasForbiddenTags = CheckForForbiddenTags(replaceInvite) ||  CheckForForbiddenTags(personalInviteToSend);

        if (hasForbiddenTags) {
            setErr(err => err + 1)
            console.log('Инвайт содержит запрещенные теги. Начинаем заново рассылку');
            clearInterval(newInterval);
            StartSendingInvites(invites, personalInvite, lastSavedDate, setLastSavedDate, setMessageInterval, setIsSending, isNewChat, onlineUsers, socket, setTodayCount, todayCount, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setLog, log, setErr, setChat, allUsers);
        }

        const userExists = allUsers.some(user => user.id === randomUser.id);

        const logItem = (
            <LogInvites
                personalInviteToSend={personalInviteToSend}
                userExists={userExists}
                replaceInvite={replaceInvite}
                randomUser={randomUser}
                key={log.length}
            />
        );

        // Проверка статуса вебсокета
        if (socket.current.readyState === WebSocket.CONNECTING) {
            console.log("WebSocket подключается...");
        } else if (socket.current.readyState === WebSocket.OPEN) {

            if (userExists) {
                // console.log("WebSocket открыт и готов к отправки персонального инвайта.");
                setTodayCount(todayCount => todayCount + 1);// выводим кол-во отправленных
                setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                SendInviteToUser(randomUser.id, personalInviteToSend, socket);
            } else {
                // console.log("WebSocket открыт и готов к обмену данными.");
                setTodayCount(todayCount => todayCount + 1);// выводим кол-во отправленных
                setLog((prevLog) => [...prevLog, logItem]); // выводим в лог
                SendInviteToUser(randomUser.id, replaceInvite, socket);
            }

        } else {
            console.log("WebSocket закрыт или закрывается. Переподключаемся...");
            ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat);
        }

    }, Math.floor(Math.random() * (7000 - 5000 + 1) + 5000));

    setMessageInterval(newInterval);

};

export default StartSendingInvites;
