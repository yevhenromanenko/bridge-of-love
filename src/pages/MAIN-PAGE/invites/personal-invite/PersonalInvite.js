

const PersonalInvite = () => {
        const storedInvites = localStorage.getItem('invites-personal');
        if (storedInvites) {
            return JSON.parse(storedInvites);
        }
}

export default PersonalInvite;
