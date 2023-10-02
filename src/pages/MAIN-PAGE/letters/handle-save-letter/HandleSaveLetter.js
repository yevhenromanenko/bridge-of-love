
const HandleSaveLetter = (ladyId, subject, letter, selectedPhotoUrl, savedEmails, setSavedEmails, setSubject, setLetter, setSelectedPhotoUrl, emails) => {
    const emailObject = {
        ladyId: ladyId,
        subject: subject,
        letter: letter.replace(/\n/g, '<br>'),
        selectedPhotoUrl: selectedPhotoUrl
    };

    // Удаление старой записи перед сохранением новой
    const updatedEmails = savedEmails.filter(email => email.ladyId !== emailObject.ladyId);
    updatedEmails.push(emailObject);

    // Сохранение обьекта письма в локал сторедж
    localStorage.setItem(`${emails}-${ladyId}`, JSON.stringify(updatedEmails));

    // Обновление состояния сохраненных писем
    setSavedEmails(updatedEmails);

    // Сброс состояния после сохранения
    setSubject(subject);
    setLetter(letter);
    setSelectedPhotoUrl(selectedPhotoUrl);

    alert('Лист було збережено');
};

export default HandleSaveLetter;
