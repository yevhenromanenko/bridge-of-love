

const HandleTagButtonClick = (tag, fieldType, setText, text) => {
    if (fieldType === 'subject' || fieldType === 'subjectMassLetter') {
        setText(text + `${tag}`);
    } else if (fieldType === 'letter' || fieldType === 'massLetter') {
        setText(text + `${tag}`);
    } else if (fieldType === 'invite') {
        setText(text + `${tag}`);
    }
};

export default HandleTagButtonClick;
