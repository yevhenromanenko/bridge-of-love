import React, {useState} from 'react';
import './AddFavorite.css'

const AddFavorite = ({ladyId, allUsers, setAllUsers, banUsers, setBanUsers}) => {
    const [inputValue, setInputValue] = useState('');
    const [banInputValue, setBanInputValue] = useState(''); // New state for ban input

    const [showUserList, setShowUserList] = useState(false)
    const [showUserBanList, setShowUserBanList] = useState(false); // State for showing ban list

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleBanInputChange = (event) => {
        setBanInputValue(event.target.value);
    };

    const toggleUserList = () => {
        setShowUserList(!showUserList);
    };

    const toggleUserBanList = () => {
        setShowUserBanList(!showUserBanList);
    };

    const removeUser = (id) => {
        const updatedUsers = allUsers.filter(item => item.id !== id);
        setAllUsers(updatedUsers);
        localStorage.setItem(`userIds-${ladyId}`, JSON.stringify(updatedUsers));
    };

    const removeBanUser = (id) => {
        const updatedBanUsers = banUsers.filter((item) => item.id !== id);
        setBanUsers(updatedBanUsers);
        localStorage.setItem(`userBanIds-${ladyId}`, JSON.stringify(updatedBanUsers));
    };

    const addBanUser = () => {
        if (!isNaN(banInputValue) && banInputValue !== '') {
            const banIds = {
                id: banInputValue,
            };

            const userExists = banUsers.some((user) => user.id === banIds.id);
            if (userExists) {
                alert('Цей користувач вже заблокований');
                return null;
            }

            const updatedBanUsers = [...banUsers, banIds];
            setBanUsers(updatedBanUsers);
            localStorage.setItem(`userBanIds-${ladyId}`, JSON.stringify(updatedBanUsers));

            // Очищаем поле ввода
            setBanInputValue('');
        }
    };

    const handleAddUser = () => {
        if (!isNaN(inputValue) && inputValue !== '') {
            const ids = {
                id: inputValue
            }

            const userExists = allUsers.some(user => user.id === ids.id);
            if (userExists) {
                alert('Постоялец уже добавлен');
                return null;
            }

            const updatedUsers = ([...allUsers, ids]);
            setAllUsers(updatedUsers);
            localStorage.setItem(`userIds-${ladyId}`, JSON.stringify(updatedUsers));

            // Очищаем поле ввода
            setInputValue('');
        }
    };

    return (
        <div className={'add-favorite-container'}>
            <input
                type="text"
                className={'add-favorite-input'}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Напишіть ID постояльця"
            />
            <button className={'add-favorite-button'} onClick={handleAddUser}>Додати</button>

            <button className={'show-hide-button'} onClick={toggleUserList}>
                {showUserList ? 'Сховати ⬆' : 'Постояльці ⬇'}
            </button>

            <button style={{marginLeft: '2%'}} className={'show-hide-button'} onClick={toggleUserBanList}>
                {showUserBanList ? 'Сховати ⬆' : 'Бан лист ⬇'}
            </button>
            <button className={'add-favorite-button'} onClick={addBanUser}>
                Додати бан юзера
            </button>

            <input
                type="text"
                className={'add-favorite-input'} // Styling for ban input
                value={banInputValue}
                onChange={handleBanInputChange}
                placeholder="ID користувача для блокування"
            />



            <br/>
            {showUserList && (
                <div className={'users-ids'}>
                    <p className={'text-user-ids'}>Додайте ID чоловіків, яким буде відправлено "персональні інвайти" для постояльців, а також, для яких буде зроблена "масова розсилка" і яким не буде відправлятись спам розсилка листів!</p>
                    {allUsers.map((user) => (
                        <>
                            <a href={`https://www.bridge-of-love.com/index.php?app=customers&id=${user.id}`} target="_blank" className="user-item" key={user.id}>
                                {user.id}
                            </a>
                            <button className="delete-id-button" onClick={() => removeUser(user.id)}>x</button>
                            <span style={{color: 'white'}}>{'; '}</span>
                        </>
                    ))}
                </div>
            )}

            {showUserBanList && (
                <div className={'users-ids'}>
                    <p className={'text-user-ids'}>Додайте ID користувачів, яким не буде відправлено нічого!</p>
                    {banUsers.map((user) => (
                        <>
                            <a href={`https://www.bridge-of-love.com/index.php?app=customers&id=${user.id}`} target="_blank" className="user-item" key={user.id}>
                                {user.id}
                            </a>
                            <button className="delete-id-button" onClick={() => removeBanUser(user.id)}>x</button>
                            <span style={{ color: 'white' }}>{'; '}</span>
                        </>
                    ))}
                </div>
            )}

        </div>
    );
};

export default AddFavorite;
