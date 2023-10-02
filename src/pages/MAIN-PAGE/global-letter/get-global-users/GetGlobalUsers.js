import axios from "axios";

const GetGlobalUsers = async (usersGlobal, setUsersGlobal, page, setPage, setIsLoading) => {

    const url = 'https://www.bridge-of-love.com/index.php?app=my_guest';
    const pageUrl = page === 1 ? url : `${url}&page=${page}`;

    try {
        const response = await axios.get(pageUrl, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'upgrade-insecure-requests': '1',
            },
            referrer: 'https://www.bridge-of-love.com/index.php?app=my_man',
            referrerPolicy: 'strict-origin-when-cross-origin',
        });

        const html = response.data;
        const ids = {};

        // Создаем временный DOM-элемент для парсинга HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Ищем все элементы с классом "name"
        const nameElements = doc.querySelectorAll('a.name');

        nameElements.forEach((element) => {
            const href = element.getAttribute('href');
            const name = element.textContent;
            const idMatch = /id=(\d+)/.exec(href);
            if (idMatch) {
                const id = idMatch[1];
                if (!ids[id]) {
                    ids[id] = name;
                }
            }
        });

        const dataArray = [];
        Object.keys(ids).forEach((id) => {
            dataArray.push({ id, name: ids[id] });
        });

        await new Promise((resolve) => setTimeout(resolve, 250));

        if (dataArray.length > 0) {
            setUsersGlobal(prevData => [...prevData, ...dataArray]);
            await new Promise(resolve => setTimeout(resolve, 250));
            setPage(prevPage => prevPage + 1);
        } else {
            setIsLoading(false);
        }

    } catch (error) {
        console.error('Произошла ошибка:', error);
        return [];
    }
}


export default GetGlobalUsers;
