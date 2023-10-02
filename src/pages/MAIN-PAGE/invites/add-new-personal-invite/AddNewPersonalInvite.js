
const AddNewPersonalInvite = (newInvite, setInvitesPersonal, invitesPersonal, setNewInvite, ladyId) => {

    if (newInvite.trim().length < 5) {
        alert('Инвайт слишком короткий. Минимум 5 символов.');
        return;
    } else if (newInvite.trim().length > 80) {
        alert('Инвайт слишком длинный. Максимум 80 символов.');
        return;
    }

    const newPersonalInvite = {
        id: Date.now().toString(),
        text: newInvite,
        ladyId: ladyId,
        smile: true,
    };

    setInvitesPersonal([...invitesPersonal, newPersonalInvite]);
    setNewInvite('');
};

export default AddNewPersonalInvite;
