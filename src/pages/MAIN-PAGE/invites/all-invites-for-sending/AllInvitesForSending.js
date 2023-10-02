
function AllInvitesForSending() {

    const storedInvites = localStorage.getItem('invites');
    if (storedInvites) {
        return JSON.parse(storedInvites);
    }
}

export default AllInvitesForSending;
