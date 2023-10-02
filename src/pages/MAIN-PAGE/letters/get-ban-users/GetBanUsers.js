
const GetBanUsers =  async (setBanUsers, ladyId) => {

    const storedInvites = localStorage.getItem(`userBanIds-${ladyId}`);

        if (storedInvites) {
            const parsedStoredInvites = JSON.parse(storedInvites);
            setBanUsers(parsedStoredInvites);
        }
}

export default GetBanUsers;
