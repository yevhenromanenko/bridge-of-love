

const PersonalInvitesList = (setInvitesList) => {

    const storedInvites = localStorage.getItem('invites-personal');
    if (storedInvites) {
        setInvitesList(JSON.parse(storedInvites));
    }

}

export default PersonalInvitesList;
