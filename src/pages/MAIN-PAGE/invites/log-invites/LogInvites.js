import React from "react";
import './LogInvites.css'

const LogInvites = ({personalInviteToSend, userExists, replaceInvite, randomUser}) => {
    const photoDeda = `https://www.bridge-of-love.com/${randomUser.photo}`
    const nullPhoto = 'https://e7.pngegg.com/pngimages/987/270/png-clipart-computer-icons-old-age-woman-grandparent-others-logo-head.png'
    const srcPhotoDeda = randomUser.photo === null ? nullPhoto : photoDeda;
    const profileLink = `https://www.bridge-of-love.com/index.php?app=customers&id=${randomUser.id}`;
    const invite = replaceInvite;

    return (
        <>
            <div className="img_in_log">
                <img src={srcPhotoDeda} className="ava_in_log" alt="" />
            </div>
            <div className="msg_in_log">
                <div className="invite_text_in_log">{userExists ? personalInviteToSend : invite}</div>
                <div className="invite_info_in_log">
                    {randomUser.name} -{' '}
                    <a
                        href={profileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ded_id_in_log"
                    >
                        {randomUser.id}
                    </a>
                    <span className="country_in_log"> {randomUser.location}</span>
                </div>
            </div>
        </>
    );
};

export default LogInvites;
