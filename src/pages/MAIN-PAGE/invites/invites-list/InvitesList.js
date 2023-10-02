
const InvitesList = (setInvitesList) => {

    const storedInvites = localStorage.getItem('invites');
    if (storedInvites) {
        setInvitesList(JSON.parse(storedInvites));
    }

}

export default InvitesList;
