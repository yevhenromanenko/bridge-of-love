import ReplaceTagsLetter from "../replace-tags-letter/ReplaceTagsLetter";
import CheckForForbiddenTags from "../../check-for-forbidden-tags/CheckForForbiddenTags";
import GetValue from "../get-values/GetValue";
import SendLetter from "../send-letter/SendLetter";
import GetRandomUser from "../../get-random-user/GetRandomUser";

const StartSendLetter = (lastSavedDateLetter, setTodayCountLetter, setLastSavedDateLetter, subject, letter, selectedPhotoUrl, setIsSending, onlineUsers, setErr, setSendingInterval, allUsers) => {
    const isSameDate = (date1, date2) => date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10);
    const currentDate = new Date();

    if (!isSameDate(currentDate, new Date(lastSavedDateLetter))) {
        // Если текущая дата отличается от сохраненной даты, обнуляем счетчик
        setTodayCountLetter(0);
        // Записываем текущую дату в локальное хранилище
        setLastSavedDateLetter(currentDate.toISOString());
    }

    if (!subject || !letter || !selectedPhotoUrl) {
        alert('Заповніть всі необхідні поля та додайти хоча б одне фото до листа!');
        setIsSending(false);
        return;
    }

    setIsSending(true);

    const interval = setInterval(async () => {

        const randomUser = GetRandomUser(onlineUsers, allUsers);

        const replaceEmailSubject = await ReplaceTagsLetter(subject, randomUser)
        const replaceEmailContent = await ReplaceTagsLetter(letter, randomUser)

        const hasForbiddenTags = CheckForForbiddenTags(replaceEmailSubject) || CheckForForbiddenTags(replaceEmailContent);

        if (hasForbiddenTags) {
            setErr(err => err + 1)
            console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
            return;
        }

        const {nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree} = await GetValue(randomUser.id, setErr);

        if (nameOne !== 'ria_key') {
            console.log('no sent')
            return;
        }

        setTodayCountLetter(todayCountLetter => todayCountLetter + 1);// выводим кол-во отправленных
        await SendLetter(randomUser.id, replaceEmailSubject, replaceEmailContent, selectedPhotoUrl, nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree)

    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    setSendingInterval(interval);

}

export default StartSendLetter;
