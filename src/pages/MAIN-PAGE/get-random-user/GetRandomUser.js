
const GetRandomUser = (onlineUsers, allUsers) => {
    const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];

    if (allUsers.length > 0) {
        const userExists = allUsers.some((user) => user.id === randomUser.id);
        if (userExists) {
            console.log(`Спроба відправки користувачу ${randomUser.id}! Не відправлено!`)
            return null;
        }
    }

    const userExists = allUsers.some((user) => user.id === randomUser.id);
    if (userExists) {
        console.log('Спроба відправки користувачу, який у бан листі! Не відправлено!')
        return null;
    }

    return randomUser;
}

export default GetRandomUser;
