import React from 'react';
import axios from 'axios';

const NewsLine = async (data, setData, page, setPage) => {

            const timestamp = Date.now();
            const url = `https://www.bridge-of-love.com/index.php?app=my_feed&act=ajax_me&page=${page}&_=${timestamp}`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        'accept': '*/*',
                        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'x-requested-with': 'XMLHttpRequest',
                    },
                    referrer: 'https://www.bridge-of-love.com/index.php?app=member',
                    referrerPolicy: 'strict-origin-when-cross-origin',
                });

                const jsonData = response.data.data.list;
                const newData = [];

                for (const key in jsonData) {
                    if (jsonData.hasOwnProperty(key)) {
                        const item = jsonData[key];
                        const idMatch = /id=(\d+)/.exec(item.title_template);
                        const nameMatch = /">([^<]+)/.exec(item.title_template);
                        const dateMatch = /title="([^"]+)/.exec(item.date);

                        const id = idMatch ? idMatch[1] : null;
                        const name = nameMatch ? nameMatch[1] : null;
                        const icon = item.icon;
                        const date = dateMatch ? dateMatch[1].split(' ')[0] : null;

                            newData.push({
                                id,
                                name,
                                icon,
                                date,
                            });
                    }
                    await new Promise(resolve => setTimeout(resolve, 300));
                }

                if (newData.length > 0 && data.length < 480) {
                    setData(prevData => [...prevData, ...newData]);
                    await new Promise(resolve => setTimeout(resolve, 300));
                    setPage(prevPage => prevPage + 1);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
};

export default NewsLine;
