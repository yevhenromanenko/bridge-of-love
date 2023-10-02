

const LoginSocket = (socket) => {
    const HashId = ((document.cookie.split(`PHPSESSID=`) || [])[1] || '').split(';')[0];
    const data = `{"type":"login","hash_id":"${HashId}"}`;
    socket.current.send(data);
};

export default LoginSocket;
