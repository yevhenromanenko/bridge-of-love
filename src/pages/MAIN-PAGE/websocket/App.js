// import React, {useEffect, useRef, useState} from 'react';
// import '../App.css';
// import axios from "axios";
// import SetOnline from "./set-online/SetOnline";
// import LoginSocket from "./login-socket/LoginSocket";
// var md5 = require('md5');
// // const socket = useRef<WebSocket | null>(null);
//
//
// function App() {
//   const socket = useRef(null);
//
//
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [isSending, setIsSending] = useState(false);
//   const [websocket, setWebSocket] = useState(null);
//   const [messageInterval, setMessageInterval] = useState(null);
//   const [isConnectSocket, setIsConnectSocket] = useState(false);
//   const whoViewProfile = useRef([]);
//   const whoGetAnswer = useRef([]);
//   const [isNewChat, setIsNewChat] = useState(false);
//   const [autoAnswerId, setAutoAnswerId] = useState('');
//   const [autoAnswerName, setAutoAnswerName] = useState('');
//   const [autoAnswerIncomingMess, setAutoAnswerIncomingMess] = useState('');
//
//
//   //const newWebsocket = new WebSocket('wss://io.bridge-of-love.com:8443');
//   const createWebSocket = () => {
//     return new WebSocket('wss://io.bridge-of-love.com:8443');
//   };
//
//
//   // Запрашиваем список онлайн пользователей с сервера
//   const fetchOnlineUsers = async () => {
//     try {
//       const response = await axios.post(
//           'https://www.bridge-of-love.com/apiv2/index.php?app=ajax&act=get_online_list',
//           'ids=',
//           {
//             headers: {
//               accept: '*/*',
//               'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
//               'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//               'x-requested-with': 'XMLHttpRequest',
//             },
//             referrer: 'https://www.bridge-of-love.com/index.php?app=chat&user_id=0',
//             referrerPolicy: 'strict-origin-when-cross-origin',
//             credentials: 'include',
//           }
//       );
//
//       // Обрабатываем полученные данные
//       console.log(response, 'response')
//       console.log(response.data.data, 'response.data.data')
//       console.log(response.data[0].data, 'response .data0 .data')
//
//       if (response && response.data[0].data) {
//         console.log('here we go')
//         setOnlineUsers(response.data[0].data);
//       }
//     } catch (error) {
//       console.error('Error fetching online users:', error);
//     }
//   };
//
//
//   const startSendingMessages = () => {
//     // const newWebsocket = new WebSocket('wss://io.bridge-of-love.com:8443');
//     //
//     setWebSocket(socket);
//
//     // var login_data = '{"type":"login","hash_id":"' + cookiesWorker.getCookie('PHPSESSID') + '"}';
//     // newWebsocket.send(login_data);
//
//     /// Отправка инвайта деду
//     const sendMessageToUser = (userId) => {
//       let toClientId = md5(userId + 'member');
//
//       const message = {
//         type: 'say',
//         to_client_id: toClientId,
//         content: 'how are u today?',
//         to_user_id: userId,
//         to_gender: 'member',
//         time: Date.now().toString()
//       };
//       console.log(userId, message)
//
//       socket.send(JSON.stringify(message));
//       //const invite = 'how are u today?';
//
//       //newWebsocket.send(JSON.stringify({ id: userId, message }));
//     };
//
//     // Обработчик получения сообщений от сервера
//     // newWebsocket.onmessage = (event) => {
//     //   const message = JSON.parse(event.data);
//     //   console.log(message, 'message from server, я так понимаю если написал дед, тогда можно понять что он написал')
//     // };
//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log('Received message from server:', message);
//     };
//
//     // Запускаем отправку инвата каждые 2 секунды
//     const newInterval = setInterval(() => {
//       // if (onlineUsers.length > 0) {
//       //   const randomIndex = Math.floor(Math.random() * onlineUsers.length);
//       //   console.log(randomIndex, 'randomIndex')
//       //   const randomUserId = onlineUsers[randomIndex].id;
//       //   console.log(randomUserId, 'randomUserId')
//       //   // const userId = '503939'
//       //   sendMessageToUser(randomUserId);
//       // }
//       if (onlineUsers.length > 0) {
//         const randomIndex = Math.floor(Math.random() * onlineUsers.length);
//         const randomUserId = onlineUsers[randomIndex].id;
//         console.log(randomUserId, 'randomUserId')
//         const userId = '503939'
//         sendMessageToUser(userId);
//       } else {
//         // No more online users, stop sending messages
//         stopSendingMessages();
//       }
//     }, 3000);
//
//     setMessageInterval(newInterval);
//   };
//
//
//   // // Периодически отправляем сообщение каждому пользователю из списка онлайн
//   // useEffect(() => {
//   //   const websocket = new WebSocket('wss://io.bridge-of-love.com:8443');
//   //
//   //   const sendMessageToUser = (userId) => {
//   //     const message = 'how are u today?';
//   //     console.log(userId, message)
//   //     websocket.send(JSON.stringify({ id: userId, message }));
//   //   };
//   //
//   //   // Обработчик получения сообщений от сервера
//   //   websocket.onmessage = (event) => {
//   //     const message = JSON.parse(event.data);
//   //     console.log(message, 'message from server, я так понимаю если написал дед, тогда можно понять что он написал')
//   //     // Обработка полученных сообщений, если необходимо
//   //   };
//   //
//   //   // Запускаем отправку сообщений каждые 2 секунды
//   //   const interval = setInterval(() => {
//   //     if (onlineUsers.length > 0) {
//   //       const randomIndex = Math.floor(Math.random() * onlineUsers.length);
//   //       console.log(randomIndex, 'randomIndex')
//   //       const randomUserId = onlineUsers[randomIndex].id;
//   //       console.log(randomUserId, 'randomUserId')
//   //       sendMessageToUser(randomUserId);
//   //     }
//   //   }, 2000);
//   //
//   //   // Отключение WebSocket при размонтировании компонента
//   //   return () => {
//   //     websocket.close();
//   //     clearInterval(interval);
//   //   };
//   // }, [onlineUsers, isSending]);
//
//   const stopSendingMessages = () => {
//     if (websocket) {
//       websocket.close();
//     }
//     if (messageInterval) {
//       clearInterval(messageInterval);
//     }
//     setWebSocket(null);
//     setMessageInterval(null);
//   };
//
//
//   // Обработчик нажатия кнопки "Начать рассылку"
//   const handleStartSending = () => {
//     setIsSending(true);
//   };
//
//   // Обработчик нажатия кнопки "Остановить рассылку"
//   const handleStopSending = () => {
//     setIsSending(false);
//     stopSendingMessages();
//   };
//
//   useEffect(() => {
//     if (isSending) {
//       startSendingMessages();
//     } else {
//       stopSendingMessages();
//     }
//   }, [isSending, onlineUsers]);
//
//   // useEffect(() => {
//   //   const interval = setInterval(() => {
//   //     newWebsocket.current?.send('{"type":"set online"}');
//   //   }, 60 * 1000);
//   //   return () => clearInterval(interval);
//   // }, []);
//
//
//   // Загружаем список онлайн пользователей при монтировании компонента
//   useEffect(() => {
//     fetchOnlineUsers();
//   }, []);
//
//   useEffect(() => {
//     socket.current = createWebSocket();
//
//     // socket.current = new WebSocket('wss://io.bridge-of-love.com:8443')
//     //const newWebsocket = new WebSocket('wss://io.bridge-of-love.com:8443');
//
//     socket.current.onopen = () => {
//       //Открываю соединение
//       //Контроллеры реакта, чтобы отображать, что сокет подключен
//       LoginSocket(socket)
//       SetOnline(socket)
//       //Соединение открыто!
//       setIsConnectSocket(true);
//     };
//
//     socket.current.onerror = (err) => {
//       console.log('Socket onerror', err);
//       setIsConnectSocket(false);
//     };
//
//     //Ответы на входящие сбщ от самого сервера бриджа
//     socket.current.onmessage = (event) => {
//       const eventData = event.data;
//
//       if(eventData === '{"type":"login","success":true}') {
//         socket.current?.send('{"type": "load page"}');
//       }
//
//       if(eventData === '{"type":"ping"}') {
//         socket.current?.send('{"type":"pong"}');
//       }
//
//       // кто смотрел профиль ?
//
//       if(eventData.includes('"type":"profile view"')) {
//         const id = ((eventData.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
//
//         console.log('Есть просмотр акк! Мои действия:');
//         console.log('whoViewProfile.current', whoViewProfile.current);
//         if(!whoViewProfile.current.includes(id)) {
//           console.log('Посмотрели акк, отправляю инвайт');
//           const name = ((eventData.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
//           console.log(name, 'name посмотрел профиль')
//           whoViewProfile.current.push(id);
//           //setWhoViewProfile(prev => [...prev, id]);
//           console.log('Отправляем инвайт тому кто просмотрел')
//           // ProfileView(id, name, socket.current!);
//         } else {
//           console.log(`Мужчина ${id} уже получал инвайт при просмотре акк`);
//         }
//       }
//
//
//
//       if(eventData.includes('"type":"say"') || eventData.includes('"type":"invite"')) {
//         console.log('Авто-ответ');
//         const id = ((eventData.split(`"from_user_id":"`) || [])[1] || '').split('",')[0];
//
//         if(!whoGetAnswer.current.includes(id)) {
//           const name = ((eventData.split(`"from_client_name":"`) || [])[1] || '').split('",')[0];
//           const messageFromMan = ((eventData.split(`"content":"`) || [])[1] || '').split('",')[0];
//
//           console.log('id', id);
//           setAutoAnswerId(id);
//           console.log('name', name);
//           setAutoAnswerName(name);
//           console.log('messageFromMan', messageFromMan);
//           setAutoAnswerIncomingMess(messageFromMan);
//           setIsNewChat(true);
//           // SoundControl('play');
//           whoGetAnswer.current.push(id);
//           //Авто-ответ
//           console.log('Отправляем автоответ')
//           ///  AutoAnswer(id, name, socket.current!);
//         } else {
//           console.log('whoGetAnswer', whoGetAnswer);
//           console.log(`Мужчина ${id} уже получил ответ`);
//         }
//       }
//     }
//
//   }, [])
//
//
//   return (
//       <div>
//         <h1>Online Users: {onlineUsers.length}</h1>
//         {/*<ul>*/}
//         {/*  {onlineUsers.map((user) => (*/}
//         {/*      <li key={user.id}>{user.name}</li>*/}
//         {/*  ))}*/}
//         {/*</ul>*/}
//         {isSending ? (
//             <button onClick={handleStopSending}>Остановить рассылку</button>
//         ) : (
//             <button onClick={handleStartSending}>Начать рассылку</button>
//         )}
//       </div>
//   );
// }
//
// export default App;
