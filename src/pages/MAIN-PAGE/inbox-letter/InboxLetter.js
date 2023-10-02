
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './InboxLetter.css'

function InboxLetter() {
    const [countNewMess, setCountNewMess] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://www.bridge-of-love.com/index.php?app=message&act=inbox", {
                    headers: {
                        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "cache-control": "max-age=0",
                        "upgrade-insecure-requests": "1"
                    },
                    referrer: "https://www.bridge-of-love.com/index.php?app=chat&user_id=0",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    method: "GET",
                    mode: "cors",
                    credentials: "include"
                });

                const $ = cheerio.load(response.data);
                const newMessElements = $(".new_mess");

                if (newMessElements.length > 0) {
                    setCountNewMess(newMessElements.length);
                }
            } catch (error) {
                console.error("Ошибка при запросе:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {countNewMess > 0 && (
                <div className={'inbox-letter'}>
                    <p className={'inbox-letter-text'}>Входящее письмо: {countNewMess} - <a className={'answer-letter-in-inbox'} href="https://www.bridge-of-love.com/index.php?app=message&act=inbox">ответить</a></p>
                </div>
            )}
        </>
    );
}

export default InboxLetter;
