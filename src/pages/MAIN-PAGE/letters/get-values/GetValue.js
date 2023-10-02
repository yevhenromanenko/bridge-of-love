import axios from "axios";

async function GetValue(randomUser, setErr) {
    try {
        const response = await axios.get(`https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=${randomUser}`, {
            headers: {
                "accept": "application/json, text/plain, */*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            },
            referrer: "https://www.bridge-of-love.com/index.php?app=chat&user_id=0",
            referrerPolicy: "strict-origin-when-cross-origin",
            method: "GET",
        });

        const html = response.data;

        // Проверяем наличие текста "Превышен лимит" в HTML-коде
        if (html.includes("Превышен лимит")) {
            console.log('Превышен лимит отправки писем')
            setErr(err => err + 1)
            return;
        }

        const inputRegex = /<input[^>]*type=["']hidden["'][^>]*name=["']([^"']+)["'][^>]*value=["']([^"']+)["'][^>]*>/g;
        const values = [];

        let match;
        while ((match = inputRegex.exec(html)) !== null) {
            const name = match[1];
            const value = match[2];
            values.push({ name, value });
        }
        let nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree;

        if (values[0].name === "ria_key") {
            nameOne = values[0].name;
            nameTwo = values[1].name;
            nameThree = values[2].name;
            valueOne = values[0].value;
            valueTwo = values[1].value;
            valueThree = values[2].value;
        } else if (values[1].name === "ria_key") {
            nameOne = values[1].name;
            nameTwo = values[2].name;
            nameThree = values[3].name;
            valueOne = values[1].value;
            valueTwo = values[2].value;
            valueThree = values[3].value;
        } else {
            console.log('"ria_key" не знайдено! Лист не буде відправлений')
        }

        return {nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree}

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default GetValue;
