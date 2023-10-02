import ReplaceTagsLetter from "../replace-tags-letter/ReplaceTagsLetter";
import CheckForForbiddenTags from "../../check-for-forbidden-tags/CheckForForbiddenTags";
import GetValue from "../get-values/GetValue";
import SendLetter from "../send-letter/SendLetter";
import GetUserInfo from "../get-user-info/GetUserInfo";

const StartSendingExtraLetters = (subject, letter, selectedPhotoUrl, selectedType, setIsSending, setSendingInterval, data, allUsers, setErr, setCount, setFrom) => {

    if (!subject || !letter || !selectedPhotoUrl) {
        alert('Заповніть всі необхідні поля та додайти хоча б одне фото до листа!');
        setIsSending(false);
        return;
    }

    const filteredUsers = data.filter(user => user.icon === selectedType);
    const uniqueIds = new Set();
    const recipients = [];

    filteredUsers.forEach(user => {
        if (!uniqueIds.has(user.id)) {
            uniqueIds.add(user.id);
            recipients.push(user);
        }
    });

    setIsSending(true);

    const totalUsersCount = recipients.length; // Общее количество пользователей
    setFrom(totalUsersCount);
    let processedUsersCount = 0; // Количество обработанных пользователей

    const interval = setInterval(async () => {

        if (processedUsersCount >= totalUsersCount) {
            // Если все пользователи были обработаны, останавливаем рассылку
            clearInterval(interval);
            setIsSending(false);
            alert('Розсилка була завершена, більше користувачів не знайдено, спробуйте повторити завтра!'); // Уведомление о завершении рассылки
            return;
        }

        const currentUser = recipients[processedUsersCount];
        processedUsersCount++;

        const userExists = allUsers.some((user) => user.id === currentUser.id);
        if (userExists) {
            setErr(err => err + 1)
            console.log('Спроба відправки користувачу, який у бан листі або постоялець! Не відправлено!')
            return null;
        }

        const randomUser = await GetUserInfo(currentUser.id)
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

        setCount(todayCount => todayCount + 1);// выводим кол-во отправленных
        await SendLetter(randomUser.id, replaceEmailSubject, replaceEmailContent, selectedPhotoUrl, nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree)

    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    setSendingInterval(interval);
}

export default StartSendingExtraLetters;
