import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import './AddInvites.css';
import InvitesList from "../invites-list/InvitesList";
import AddNewInvite from "../add-new-invite/AddNewInvite";
import HandleTagButtonClick from "../../handle-tag-button-click/HandleTagButtonClick";
import AddNewPersonalInvite from "../add-new-personal-invite/AddNewPersonalInvite";
import PersonalInvitesList from "../personal-invites-list/PersonalInvitesList";

const AddInvites = ({ladyId}) => {

    const [newInvite, setNewInvite] = useState('');
    const [invites, setInvites] = useState([]);
    const [invitesPersonal, setInvitesPersonal] = useState([]);
    const [personalInvite, setPersonalInvite] = useState(false); // State для галочки


    const onPersonalInviteChange = (e) => {
        setPersonalInvite(e.target.checked);
    }

    useEffect(() => {
        InvitesList(setInvites);
        PersonalInvitesList(setInvitesPersonal)
    }, []);

    // Обновление состояния списка дел при изменении
    useEffect(() => {
        localStorage.setItem('invites', JSON.stringify(invites));
    }, [invites]);

    useEffect(() => {
        localStorage.setItem('invites-personal', JSON.stringify(invitesPersonal));
    }, [invitesPersonal]);

    const addInvite = () => {
        if (ladyId.length === 0) {
            alert("Не обнаружено айди Леди на странице, попробуйте еще раз!");
            return;
        }
        if (personalInvite) {
            AddNewPersonalInvite(newInvite, setInvitesPersonal, invitesPersonal, setNewInvite, ladyId);
        } else {
            AddNewInvite(newInvite, setInvites, invites, setNewInvite, ladyId);
        }
    }

    const deleteInvite = (id) => {
        const updatedInvites = invites.filter(item => item.id !== id);
        setInvites(updatedInvites);
    };

    const deleteInvitePersonal = (id) => {
        const updatedInvites = invitesPersonal.filter(item => item.id !== id);
        setInvitesPersonal(updatedInvites);
    };

    return (
        <div className="add-invites-container">
            <h1 className="add-invites-title">Інвайти:</h1>
            <div>
                <div className="tag-buttons">
                    <button className="tag-button" onClick={() => HandleTagButtonClick('%Name%', 'invite', setNewInvite, newInvite)}>Ім'я</button>
                    <button className="tag-button" onClick={() => HandleTagButtonClick('%Age%', 'invite', setNewInvite, newInvite)}>Вік</button>
                    <button className="tag-button" onClick={() => HandleTagButtonClick('%Country%', 'invite', setNewInvite, newInvite)}>Країна</button>
                </div>
                <input
                    className="add-invites-input"
                    type="text"
                    value={newInvite}
                    onChange={(e) => setNewInvite(e.target.value)}
                    placeholder="Напишіть інвайт"
                />
                <br/>
                <input
                    className={'checkbox-personal-invite'}
                    type="checkbox"
                    id="indeterminate-checkbox"
                    checked={personalInvite}
                    onChange={onPersonalInviteChange}
                />
                <span style={{ position: 'relative', marginLeft: '5px', color: "#ececf1"}}>
                  Персональний інвайт
                </span>
                <button className="add-invites-button" onClick={addInvite}>Додати</button>



            </div>
            <ul className={`invite-list ${invites.length + invitesPersonal.length > 4 ? 'scrollable' : ''}`}>
                {invites.map((invite) => (
                    <li className="invite-item" key={invite.id}>
                        {invite.text} <button className="delete-button" onClick={() => deleteInvite(invite.id)}>Видалити</button>
                    </li>
                ))}
                {invitesPersonal.map((invite) => (
                    <li className="invite-item" key={invite.id}>
                        {invite.text}
                        <div>
                            <FaHeart style={{marginRight: '5px'}}/>
                            <button className="delete-button" onClick={() => deleteInvitePersonal(invite.id)}>Видалити</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddInvites;
