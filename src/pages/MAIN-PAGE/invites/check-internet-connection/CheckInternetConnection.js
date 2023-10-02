// import ConnectWebSocket from "../connect-web-socket/ConnectWebSocket";
//
//
// const CheckInternetConnection = (setErrorMessage, socket, setIsConnectSocket, whoViewProfile, whoGetAnswer, setIsNewChat) => {
//     if (!navigator.onLine) {
//         console.log('here')
//        // setErrorMessage('Помилка підключення, немає з\'єднання з Інтернетом. Перепідключаюсь...');
//     } else {
//        // setErrorMessage(''); // Clear error message when internet connection is restored.
//         if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
//             ConnectWebSocket(socket, setIsConnectSocket, setErrorMessage, whoViewProfile, whoGetAnswer, setIsNewChat);
//         }
//     }
// };
//
// export default CheckInternetConnection;
