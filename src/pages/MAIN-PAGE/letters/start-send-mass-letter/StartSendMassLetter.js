import ReplaceTagsLetter from "../replace-tags-letter/ReplaceTagsLetter";
import CheckForForbiddenTags from "../../check-for-forbidden-tags/CheckForForbiddenTags";
import GetValue from "../get-values/GetValue";
import SendLetter from "../send-letter/SendLetter";
import GetUserInfo from "../get-user-info/GetUserInfo";

const StartSendMassLetter = (setCountMassLetter, subjectMassLetter, massLetter, selectedPhotoUrlMassLetter, setIsSendingMassLetter, setErrMassLetter, setSendingIntervalMassLetter, allUsers, banUsers) => {


    if (!subjectMassLetter || !massLetter || !selectedPhotoUrlMassLetter) {
        alert('Заповніть всі необхідні поля та додайти хоча б одне фото до листа!');
        setIsSendingMassLetter(false);
        return;
    }

    const finishDate = new Date(); // Дата завершения рассылки
    localStorage.setItem('massLetterFinishDate', finishDate.toISOString());

    setIsSendingMassLetter(true);

    const totalUsersCount = allUsers.length; // Общее количество пользователей
    let processedUsersCount = 0; // Количество обработанных пользователей

    const intervalMassLetter = setInterval(async () => {

        if (processedUsersCount >= totalUsersCount) {
            // Если все пользователи были обработаны, останавливаем рассылку
            clearInterval(intervalMassLetter);
            setIsSendingMassLetter(false);
            alert('Розсилка була завершена! Дякую, повторіть, будь ласка через 5 днів!'); // Уведомление о завершении рассылки
            return;
        }

        const currentUser = allUsers[processedUsersCount];
        processedUsersCount++;

        console.log(currentUser, 'allUsers')
        console.log(banUsers, 'BanUsers')

        const userExists = banUsers.some((user) => user.id === currentUser.id);
        if (userExists) {
            setErrMassLetter(err => err + 1)
            console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
            return null;
        }

        const randomUser = await GetUserInfo(currentUser.id)
        console.log(randomUser, `randomUser`)

        const replaceEmailSubject = await ReplaceTagsLetter(subjectMassLetter, randomUser)
        const replaceEmailContent = await ReplaceTagsLetter(massLetter, randomUser)

        const hasForbiddenTags = CheckForForbiddenTags(replaceEmailSubject) || CheckForForbiddenTags(replaceEmailContent);

        if (hasForbiddenTags) {
            setErrMassLetter(err => err + 1)
            console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
            return;
        }

        const {nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree} = await GetValue(randomUser.id, setErrMassLetter);

        if (nameOne !== 'ria_key') {
            console.log('no sent')
            return;
        }

        setCountMassLetter(todayCountLetter => todayCountLetter + 1);// выводим кол-во отправленных
        await SendLetter(randomUser.id, replaceEmailSubject, replaceEmailContent, selectedPhotoUrlMassLetter, nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree)

    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    setSendingIntervalMassLetter(intervalMassLetter);

}

export default StartSendMassLetter;
