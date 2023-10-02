import CreateWebSocket from "../../websocket/create-web-socket/CreateWebSocket";
import LoginSocket from "../../websocket/login-socket/LoginSocket";
import SetOnline from "../../websocket/set-online/SetOnline";
import SendInviteToUser from "../send-invite-to-user/SendInviteToUser";
import SendPhotoToUser from "../send-photo-to-user/SendPhotoToUser";

const ConnectWebSocket = (socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat, setChat, img) => {

    socket.current = CreateWebSocket();

    socket.current.onopen = () => {
        LoginSocket(socket)
        SetOnline(socket)
        setErrorMessage(''); // Clear any previous error messages when the WebSocket is reconnected.
        setIsConnectSocket(true);
    };

    socket.current.onerror = (err) => {
        console.log('Socket onerror', err);
        setErrorMessage('Ошибка, обновите программу!');
        setIsConnectSocket(false);
    };

    // socket.current.onclose = (event) => {
    //     console.log('WebSocket закрыт. Код:', event.code, 'Причина:', event.reason);
    //     setErrorMessage('Ошибка подлючения к интернету! Рассылка остановлена! Подключитесь к интернету и обновите программу!');
    //     setIsConnectSocket(false);
    // };

    socket.current.onmessage = (event) => {
        const eventData = event.data;
        setErrorMessage('');

        if(eventData === '{"type":"login","success":true}') {
            socket.current?.send('{"type": "load page"}');
        }

        if(eventData === '{"type":"ping"}') {
            socket.current?.send('{"type":"pong"}');
        }

        // кто смотрел профиль ?
        if(eventData.includes('"type":"profile view"')) {
            const id = ((eventData.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
            const profileLink = `https://www.bridge-of-love.com/index.php?app=customers&id=${id}`;
            const writeMessageLink = `https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=${id}`;

            console.log('Есть просмотр акк! Мои действия:');
            console.log('whoViewProfile.current', whoViewProfile.current);
            if(!whoViewProfile.current.includes(id)) {
                console.log('Посмотрели акк, отправляю инвайт');
                const name = ((eventData.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
                console.log(name, 'name посмотрел профиль')

                setErrorMessage(
                    <div>
                    Чоловік{" "}
                        <a href={profileLink} target="_blank">{id}</a>{" "}
                        подивився профіль!{" "}
                        <a href={writeMessageLink} target="_blank">Напишіть</a>{" "}
                        йому листа!
                    </div>
                );

                const inviteWhoViewProfile = [`${name}, do u like my profile?`, `Do you like me?`, `Welcome to my profile dear ${name}`, `Can we get to know each other better, and not just look at each other's profiles?`]
                const randomInviteWhoViewProfile = inviteWhoViewProfile[Math.floor(Math.random() * inviteWhoViewProfile.length)];

                whoViewProfile.current.push(id);
                console.log('Отправляем инвайт тому кто просмотрел')
                SendInviteToUser(id, randomInviteWhoViewProfile, socket);

                // ProfileView(id, name, socket.current!);
            } else {
                console.log(`Мужчина ${id} уже получал инвайт при просмотре акк`);
            }
        }

        if(eventData.includes('"type":"say"') || eventData.includes('"type":"invite"')) {
            console.log('Авто-ответ');
            const id = ((eventData.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
            const profileLink = `https://www.bridge-of-love.com/index.php?app=customers&id=${id}`;
            const writeMessageLink = `https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=${id}`;

            if(!whoGetAnswer.current.includes(id)) {
                const name = ((eventData.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
                const messageFromMan = ((eventData.split(`"content":"`) || [])[1] || '').split('",')[0];
                const invite = [`${name}, nice to see you!`, `Hi dear!`, `Hi ${name}`];
                const photo = `/${img}`
                const randomInvite = invite[Math.floor(Math.random() * invite.length)];

                console.log('id', id);
                // setAutoAnswerId(id);
                console.log('name', name);
                // setAutoAnswerName(name);
                console.log('messageFromMan', messageFromMan);
                // setAutoAnswerIncomingMess(messageFromMan);
                setIsNewChat(true);
                // SoundControl('play');
                whoGetAnswer.current.push(id);

                setErrorMessage(
                    <div>
                        Почався чат з{" "}
                        <a href={profileLink} target="_blank">{id}!</a>{" "}
                        Було б добре{" "}
                        <a href={writeMessageLink} target="_blank">написати</a>{" "}
                        йому листа після чату!
                    </div>
                );
                //Авто-ответ
                console.log('Отправляем автоответ')
                setChat(chat => chat + 1)
                SendInviteToUser(id, randomInvite, socket);
                console.log('Отправляем фото', id, photo, socket)
                SendPhotoToUser(id, photo, socket)

                ///  AutoAnswer(id, name, socket.current!);
            } else {
                console.log('whoGetAnswer', whoGetAnswer);
                console.log(`Мужчина ${id} уже получил ответ`);
            }
        }
    }
};


export default ConnectWebSocket;
