import * as cheerio from "cheerio";
import axios from "axios";

const GetIdsFromOnePage = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "upgrade-insecure-requests": "1"
            }
        });

        const $ = cheerio.load(response.data);
        const idElements = $('p.age'); // Предполагая, что имя класса - 'age'

        const allIds = [];

        idElements.each((index, element) => {
            const idValue = $(element).text().match(/ID:\s*(\d+)/)[1];
            if (!allIds.includes(idValue)) {
                allIds.push(idValue);
            }
        });

        return allIds;
    } catch (error) {
        console.error('Error fetching or extracting data:', error);
        return [];
    }
};

export default GetIdsFromOnePage;
