
const GetLetter = (setSavedEmails, setSubject, setLetter, setSelectedPhotoUrl, ladyId, emails) => {
    const email = JSON.parse(localStorage.getItem(`${emails}-${ladyId}`)) || [];
    setSavedEmails(email);

    if (email.length > 0) {
        const lastEmail = email[email.length - 1];
        setSubject(lastEmail.subject || ''); // Пустая строка - если сохраненной темы нет
        setLetter(lastEmail.letter.replace(/<br>/g, '\n') || '');   // Пустая строка - если сохраненного письма нет
        setSelectedPhotoUrl(lastEmail.selectedPhotoUrl || '');
    }
}

export default GetLetter;
