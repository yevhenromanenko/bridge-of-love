
const AddNewInvite = (newInvite, setInvites, invites, setNewInvite, newId) => {

    if (newInvite.trim().length < 5) {
        alert('Инвайт слишком короткий. Минимум 5 символов.');
        return;
    } else if (newInvite.trim().length > 80) {
        alert('Инвайт слишком длинный. Максимум 80 символов.');
        return;
    }

    const newInviteObj = {  id: Date.now().toString(), text: newInvite, ladyId: newId, };

    setInvites([...invites, newInviteObj]);
    setNewInvite('');
};

export default AddNewInvite;
