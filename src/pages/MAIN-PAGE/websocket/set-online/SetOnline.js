
const SetOnline = (socket) => {
    socket.current.send('{"type":"set online"}');
};

export default SetOnline;
