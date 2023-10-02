var md5 = require('md5');

const SendPhotoToUser = (userId, photo, socket) => {

    let toClientId = md5(userId + 'member');

    const message = {
        type: 'image',
        to_client_id: toClientId,
        content: photo,
        to_user_id: userId,
        to_gender: 'member'
    };
    console.log(message, 'message отправили')
    socket.current.send(JSON.stringify(message));
};

export default SendPhotoToUser;
