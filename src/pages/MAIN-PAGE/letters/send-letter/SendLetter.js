import axios from "axios";
import * as cheerio from "cheerio";

const SendLetter = async (randomUser, subject, letter, selectedPhotoUrl, nameOne, nameTwo, nameThree, valueOne, valueTwo, valueThree) => {
    try {
        const letterToSend = letter.replace(/\n/g, '<br>')
        const form = new FormData();

        form.append('msg_subject', `${subject}`);
        form.append(`${nameOne}`, `${valueOne}`);
        form.append(`${nameTwo}`, `${valueTwo}`);
        form.append(`${nameThree}`, `${valueThree}`);
        form.append('phone_id', '');
        form.append('to_user_id', `${randomUser}`);
        form.append(
            'msg_content',
            `<span style="font-family: verdana,geneva; font-size: 1.06em;">${letterToSend}<br/><p class="thumb" style="text-align: center;"><img class="imageMes" src="${selectedPhotoUrl}" border="0" width="300" /></p></span>`
        );
        form.append('video_id', '0');

        const response = await axios.post(`https://www.bridge-of-love.com/index.php?app=message&act=send&to_user_id=${randomUser}`, form);
        // Обработка успешного ответа
        // Обработка успешного ответа
        const responseBody = response.data;

        // Парсинг HTML-ответа с использованием cheerio
        const $ = cheerio.load(responseBody);
        const title = $("title").text();

        // Проверяем, есть ли заголовок в HTML
        const result = title ? title : responseBody.result;
        console.log(`Отправили письмо мужчине id: ${randomUser}, статус - ${result}`);

    } catch (error) {
        // Обработка ошибки
        console.error('Ошибка:', error);
    }
}

export default SendLetter;

