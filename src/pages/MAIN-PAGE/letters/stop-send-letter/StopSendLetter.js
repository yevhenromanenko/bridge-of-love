
const StopSendLetter = (sendingInterval, setIsSending) => {
    clearInterval(sendingInterval); // Остановка интервала
    setIsSending(false);     // Установка флага о завершении рассылки
};

export default StopSendLetter;
