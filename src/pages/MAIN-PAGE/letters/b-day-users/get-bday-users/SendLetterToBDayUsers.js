import GetUserInfo from "../../get-user-info/GetUserInfo";
import ReplaceTagsLetter from "../../replace-tags-letter/ReplaceTagsLetter";
import CheckForForbiddenTags from "../../../check-for-forbidden-tags/CheckForForbiddenTags";
import GetValue from "../../get-values/GetValue";
import SendLetter from "../../send-letter/SendLetter";

const SendLetterToBDayUsers = (subjectBDay, letterBDay, selectedPhotoUrlBDay, setIsSendingBDay, setSendingIntervalBDay, usersBDay, setErrBDay, setCountBDay, setFromBDay) => {

    if (!subjectBDay || !letterBDay || !selectedPhotoUrlBDay) {
        alert('Заповніть всі необхідні поля та додайти хоча б одне фото до листа!');
        setIsSendingBDay(false);
        return;
    }

    setIsSendingBDay(true);

    const totalUsersCount = usersBDay.length; // Общее количество пользователей
    setFromBDay(totalUsersCount);
    let processedUsersCount = 0; // Количество обработанных пользователей

    const interval = setInterval(async () => {

        if (processedUsersCount >= totalUsersCount) {
            // Если все пользователи были обработаны, останавливаем рассылку
            clearInterval(interval);
            setIsSendingBDay(false);
            alert('Розсилка була завершена, більше користувачів не знайдено, спробуйте повторити завтра!'); // Уведомление о завершении рассылки
            return;
        }

        const currentUser = usersBDay[processedUsersCount];
        processedUsersCount++;

        const randomUser = await GetUserInfo(currentUser.id)
        console.log(randomUser, `randomUser`)
        console.log(randomUser.bDayDate, 'randomUser.bDayDate')

        if (randomUser && randomUser.bDayDate) {
            const today = new Date();
            console.log(today, 'today')
            const bDay = new Date(randomUser.bDayDate);
            console.log(bDay, 'bDay')

            // Сравниваем день и месяц даты рождения с текущей датой
            if (today.getDate() === bDay.getDate() && today.getMonth() === bDay.getMonth()) {
                console.log("Сегодня день рождения пользователя, работаем с ним.");

                const replaceEmailSubject = await ReplaceTagsLetter(subjectBDay, randomUser)
                const replaceEmailContent = await ReplaceTagsLetter(letterBDay, randomUser)


                const hasForbiddenTags = CheckForForbiddenTags(replaceEmailSubject) || CheckForForbiddenTags(replaceEmailContent);

                if (hasForbiddenTags) {
                    setErrBDay(err => err + 1)
                    console.log('Письмо содержит запрещенные теги. Начинаем заново рассылку');
                    return;
                }

                const {nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree} = await GetValue(randomUser.id, setErrBDay);

                if (nameOne !== 'ria_key') {
                    console.log('no sent')
                    return;
                }

                setCountBDay(todayCount => todayCount + 1);// выводим кол-во отправленных
                await SendLetter(randomUser.id, replaceEmailSubject, replaceEmailContent, selectedPhotoUrlBDay, nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree)

                // Можно добавить дополнительную логику или вернуть null, если нужно пропустить обработку
            } else {
                setErrBDay(err => err + 1)
                return;
            }
        } else {
            setErrBDay(err => err + 1)
            console.log("Данные о дате рождения отсутствуют или не найдены.");
            return; // Возвращаем, если нет данных о дате рождения
        }

    }, Math.floor(Math.random() * (40000 - 20000 + 1) + 20000));

    setSendingIntervalBDay(interval);
}

export default SendLetterToBDayUsers;
