import React from 'react';
import axios from 'axios';

const GetUserInfo = async (userId) => {

            try {
                const response = await axios.get(`https://www.bridge-of-love.com/index.php?app=customers&id=${userId}`, {
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                        "cache-control": "max-age=0",
                        "upgrade-insecure-requests": "1"
                    },
                    referrer: "https://www.bridge-of-love.com/index.php?app=chat&user_id=0",
                    referrerPolicy: "strict-origin-when-cross-origin",
                });

                const html = response.data;

                const nameRegex = /<div class="orange name1 g_h2">([^<]+)<\/div>/;
                const nameMatch = html.match(nameRegex);
                const extractedName = nameMatch ? nameMatch[1] : null;

                const idRegex = /<span class="id1">ID: ([^<]+)<\/span>/;
                const idMatch = html.match(idRegex);
                const extractedId = idMatch ? idMatch[1] : null;

                const ageRegex = /<p class="g_title">Возраст<\/p>\s+<p class="g_text">(-|\d+)<\/p>/;
                const ageMatch = html.match(ageRegex);
                const extractedAge = ageMatch && ageMatch[1] !== '-' ? ageMatch[1] : null;

                const locationRegex = /<p class="g_title">Город<\/p>\s+<p class="g_text">(-|[^<]+)<\/p>/;
                const locationMatch = html.match(locationRegex);
                const extractedLocation = locationMatch && locationMatch[1] !== '-' ? locationMatch[1] : null;

                const bDayDateRegex = /<p class="g_title">Дата рождения<\/p>\s+<p class="g_text">([^<]+)<\/p>/;
                const bDayDateMatch = html.match(bDayDateRegex);
                const bDayDate = bDayDateMatch ? bDayDateMatch[1] : null;

                return {
                    name: extractedName,
                    id: extractedId,
                    age: extractedAge,
                    location: extractedLocation,
                    bDayDate: bDayDate
                };
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
    };

export default GetUserInfo;
