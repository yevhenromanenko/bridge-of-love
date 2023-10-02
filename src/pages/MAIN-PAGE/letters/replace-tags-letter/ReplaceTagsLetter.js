import React from 'react';

const ReplaceTagsLetter = (letter, randomUser) => {

    const { name, location, age } = randomUser;

    let fullName = name.toString();
    let firstRightName;

    if (fullName.includes('.')) {
        // Обрезаем имя до первой точки
        const dotIndex = fullName.indexOf('.');
        firstRightName = fullName.substring(0, dotIndex); // Взяли часть строки до точки
        firstRightName = firstRightName[0].toUpperCase() + firstRightName.slice(1); // Сделали первую букву заглавной
    } else {
        firstRightName = fullName[0].toUpperCase() + fullName.slice(1);
    }

    const replaceTags = () => {

        let result = letter;

        // Заменяем все вхождения тегов
        while (result.includes('%Name%')) {
            result = result.replace('%Name%', firstRightName);
        }

        while (result.includes('%Age%')) {
            result = result.replace('%Age%', age);
        }

        while (result.includes('%Country%')) {
            result = result.replace('%Country%', location);
        }

        let invalidAge = result.includes('%Age%') && age === null;
        let invalidCountry = result.includes('%Country%') && location === null;

        if (invalidAge || invalidCountry) {
            console.log('Ошибка отправки!');
            return;
        }

        return result;
    };

    return replaceTags();
};

export default ReplaceTagsLetter;
