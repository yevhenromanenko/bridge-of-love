import React, {useEffect, useState} from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const GetBDayUsers = (setIsLoading) => {
    const [usersBDay, setUsersBDay] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://www.bridge-of-love.com/index.php?app=member';

            try {
                const response = await axios.get(url, {
                    headers: {
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                        'cache-control': 'max-age=0',
                        'upgrade-insecure-requests': '1'
                    },
                    referrerPolicy: 'strict-origin-when-cross-origin',
                });

                if (response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);

                    const extractedUsers = $('.body-news').map((index, element) => {
                        const id = $(element).find('.name-userb').attr('href').split('&id=')[1]; // Извлекаем значение id
                        const name = $(element).find('.name-userb').text().trim();
                        return { id, name };
                    }).get();

                    await new Promise((resolve) => setTimeout(resolve, 350));
                    setIsLoading(false);
                    setUsersBDay(extractedUsers);
                } else {
                    console.error('Failed to fetch the page');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return usersBDay;
}

export default GetBDayUsers;
