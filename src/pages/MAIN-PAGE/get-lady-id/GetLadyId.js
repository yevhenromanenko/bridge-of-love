import {useState} from "react";

const GetLadyId = () => {
    const [ladyId, setLadyId] = useState('')

    async function fetchData() {
        const response = await fetch("https://www.bridge-of-love.com/index.php?app=chat&user_id=0")
        const htmlText = await response.text();
        const regex = /var globalUserId = "(\d+)";/;
        const match = htmlText.match(regex);
        if (match && match.length === 2) {
            const id = match[1];
            setLadyId(id);
        } else {
            console.log("Не удалось найти айди Леди на странице.");
        }
    }
    fetchData();

    return ladyId;
}

export default GetLadyId;
