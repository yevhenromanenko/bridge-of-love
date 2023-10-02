import GetOnlineUsers from "./get-online-users/GetOnlineUsers";
import Invites from "./invites/Invites";
import AddInvites from "./invites/add-invites/AddInvites";
import './MainPage.css'
import React, {useEffect, useState} from "react";
import Log from "./invites/log/Log";
import AddFavorite from "./add-favorite/AddFavorite";
import Letters from "./letters/Letters";
import GetLadyId from "./get-lady-id/GetLadyId";
import GetFavorite from "./get-favorite/GetFavorite";
import InboxLetter from "./inbox-letter/InboxLetter";
import GetBanUsers from "./letters/get-ban-users/GetBanUsers";
import MassLetterFinishDate from "./letters/mass-letter-finish-date/MassLetterFinishDate";
import NewsLine from "./letters/news-line/NewsLine";
import ExtraMailing from "./letters/extra-mailing/ExtraMailing";
import BDayUsers from "./letters/b-day-users/BDayUsers";
import GlobalLetter from "./global-letter/GlobalLetter";
import GetGlobalUsers from "./global-letter/get-global-users/GetGlobalUsers";

const MainPage = () => {

    const onlineUsers = GetOnlineUsers();
    const [log, setLog] = useState([]);
    const ladyId = GetLadyId();
    const [allUsers, setAllUsers] = useState([]);
    const [banUsers, setBanUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const [usersGlobal, setUsersGlobal] = useState([]);
    const [pageGlobal, setPageGlobal] = useState(1);


    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null); // Добавили состояние для сохранения выбранного фото
    const [savedEmails, setSavedEmails] = useState([])
    const [subject, setSubject] = useState('');
    const [letter, setLetter] = useState('');
    const emails = 'emails';

    useEffect(() => {
        GetBanUsers(setBanUsers, ladyId)
        GetFavorite(setAllUsers, ladyId);
    }, [ladyId]);

    useEffect(() => {
        NewsLine(data, setData, page, setPage);
    }, [page]);

    useEffect(() => {
        GetGlobalUsers(usersGlobal, setUsersGlobal, pageGlobal, setPageGlobal, setIsLoading);
    }, [pageGlobal]);

    return (
        <>
            <div>
                <MassLetterFinishDate/>
            </div>
            <div>
                <InboxLetter/>
            </div>
            <div className={'main-page'} >

                <div className={'left-part'}>
                    <AddInvites ladyId={ladyId}/>
                </div>

                <div className={'right-part'} >
                    <Invites
                        onlineUsers={onlineUsers}
                        log={log}
                        setLog={setLog}
                        allUsers={allUsers}
                        img={selectedPhotoUrl}
                    />
                </div>

                <div className={'right-part-down'} >
                    <Log log={log}/>
                </div>

            </div>
            <div>
                <AddFavorite
                    ladyId={ladyId}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setBanUsers={setBanUsers}
                    banUsers={banUsers}
                />
            </div>
            <div>
                <Letters
                    ladyId={ladyId}
                    onlineUsers={onlineUsers}
                    allUsers={allUsers}
                    banUsers={banUsers}
                    selectedPhotoUrl={selectedPhotoUrl}
                    setSelectedPhotoUrl={setSelectedPhotoUrl}
                    savedEmails={savedEmails}
                    setSavedEmails={setSavedEmails}
                    subject={subject}
                    setSubject={setSubject}
                    letter={letter}
                    setLetter={setLetter}
                    emails={emails}
                />
            </div>
            <div>
                <ExtraMailing
                    data={data}
                    ladyId={ladyId}
                    allUsers={allUsers}
                />
            </div>
            <div>
                <BDayUsers
                    ladyId={ladyId}
                />
            </div>
            <div>
                <GlobalLetter
                    ladyId={ladyId}
                    allUsers={allUsers}
                    selectedPhotoUrl={selectedPhotoUrl}
                    setSelectedPhotoUrl={setSelectedPhotoUrl}
                    savedEmails={savedEmails}
                    setSavedEmails={setSavedEmails}
                    subject={subject}
                    setSubject={setSubject}
                    letter={letter}
                    setLetter={setLetter}
                    emails={emails}
                    usersGlobal={usersGlobal}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
};

export default MainPage;
