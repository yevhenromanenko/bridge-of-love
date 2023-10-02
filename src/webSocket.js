// import React, {useEffect, useState, useRef} from 'react';
//
//
// const [isConnectSocket, setIsConnectSocket] = useState(false);
// const socket = useRef(WebSocket | null);
//
// useEffect(() => {
//     // import SOCKET_HOST wss://io.bridge-of-love.com:8443
//     socket.current = new WebSocket(SOCKET_HOST)
//
//     socket.current.onopen = () => {
//         //Открываю соединение
//         //Контроллеры реакта, чтобы отображать, что сокет подключен
//         LoginSocket(socket.current!);
//         SetOnline(socket.current!);
//         //Соединение открыто!
//         setIsConnectSocket(true);
//     };
//     socket.current.onerror = (err) => {
//         console.log('Socket onerror', err);
//         setIsConnectSocket(false);
//     };
//
//
//     //Ответы на входящие сбщ от самого сервера бриджа
//     socket.current.onmessage = (event) => {
//         if(event.data === '{"type":"login","success":true}') {
//             socket.current?.send('{"type": "load page"}');
//         };
//         if(event.data === '{"type":"ping"}') {
//             socket.current?.send('{"type":"pong"}');
//         }
//         if(event.data.includes('"type":"profile view"')) {
//             const id: string = ((event.data.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
//             console.log('Есть просмотр акк! Мои действия:');
//             console.log('whoViewProfile.current', whoViewProfile.current);
//             if(!whoViewProfile.current.includes(id)) {
//                 console.log('Посмотрели акк, отправляю инвайт');
//                 const name: string = ((event.data.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
//                 whoViewProfile.current.push(id);
//                 //setWhoViewProfile(prev => [...prev, id]);
//                 ProfileView(id, name, socket.current!);
//             } else {
//                 console.log(`Мужчина ${id} уже получал инвайт при просмотре акк`);
//             }
//         }
//
//
//
//         if(event.data.includes('"type":"say"') || event.data.includes('"type":"invite"')) {
//             console.log('Авто-ответ');
//             const id: string = ((event.data.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
//             if(!whoGetAnswer.current.includes(id)) {
//                 const name: string = ((event.data.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
//                 const messageFromMan: string = ((event.data.split(`"content":"`) || [])[1] || '').split('",')[0];
//                 console.log('id', id);
//                 setAutoAnswerId(id);
//                 console.log('name', name);
//                 setAutoAnswerName(name);
//                 console.log('messageFromMan', messageFromMan);
//                 setAutoAnswerIncomingMess(messageFromMan);
//                 setIsNewChat(true);
//                 SoundControl('play');
//                 whoGetAnswer.current.push(id);
//                 //Авто-ответ
//                 AutoAnswer(id, name, socket.current!);
//             } else {
//                 console.log('whoGetAnswer', whoGetAnswer);
//                 console.log(`Мужчина ${id} уже получил ответ`);
//             }
//         }
//     }
// }, []);
