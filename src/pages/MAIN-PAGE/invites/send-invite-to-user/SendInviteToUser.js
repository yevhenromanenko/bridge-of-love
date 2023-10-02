var md5 = require('md5');

const SendInviteToUser = (userId, invite, socket) => {

    let toClientId = md5(userId + 'member');

    const message = {
        type: 'say',
        to_client_id: toClientId,
        content: invite,
        to_user_id: userId,
        to_gender: 'member',
        time: Date.now().toString()
    };
    socket.current.send(JSON.stringify(message));
};

export default SendInviteToUser;

