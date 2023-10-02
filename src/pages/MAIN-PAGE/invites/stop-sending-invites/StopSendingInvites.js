

const StopSendingInvites = (socket, messageInterval, setIsSending, setMessageInterval, setIsConnectSocket, setErrorMessage) => {

    if (socket && socket.current) {
        socket.current.close();
    }
    setIsSending(false);
    clearInterval(messageInterval);
    setMessageInterval(null);
    setIsConnectSocket(false);
    setErrorMessage('');


};

export default StopSendingInvites;
