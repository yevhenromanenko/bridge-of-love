import axios from "axios";
import {useEffect, useState} from "react";

// Запрашиваем список онлайн пользователей с сервера
const GetOnlineUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchOnlineUsers = async () => {
            try {
                const response = await axios.post(
                    'https://www.bridge-of-love.com/apiv2/index.php?app=ajax&act=get_online_list',
                    'ids=',
                    {
                        headers: {
                            accept: '*/*',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                            'x-requested-with': 'XMLHttpRequest',
                        },
                        referrer: 'https://www.bridge-of-love.com/index.php?app=chat&user_id=0',
                        referrerPolicy: 'strict-origin-when-cross-origin',
                        credentials: 'include',
                    }
                );

                if (response && response.data[0].data) {
                    setUsers(response.data[0].data);
                }
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };
        fetchOnlineUsers();

        const interval = setInterval(() => {
            fetchOnlineUsers();
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return users;
};

export default GetOnlineUsers;

