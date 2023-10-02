import {useEffect, useState} from "react";
import './GetPhotos.css'


const GetPhotos = ({ladyId, setSelectedPhotoUrl}) => {

    const [photoUrls, setPhotoUrls] = useState([]);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);


    const fetchPhotoUrls = async () => {
        const baseUrl = 'https://www.bridge-of-love.com';
        const photoUrls = [];

        const initialPageResponse = await fetch(`${baseUrl}/index.php?app=my_privat_gallery`, {
            method: 'GET',
            // Здесь добавьте заголовки для первой страницы
        });

        const initialHtml = await initialPageResponse.text();
        const initialRegex = /<img src="data\/files\/images\/lady\/maill\/[^\/]+\/([^"]+)"[^>]*>/g;
        let initialMatch;

        while ((initialMatch = initialRegex.exec(initialHtml)) !== null) {
            const [, fileName] = initialMatch;
            photoUrls.push(`data/files/images/lady/maill/user_${ladyId}/${fileName}`);
        }

        let page = 2;
        let hasNextPage = true;

        while (hasNextPage) {
            const response = await fetch(`${baseUrl}/index.php?app=my_privat_gallery&page=${page}`, {
                method: 'GET',
                // Здесь добавьте заголовки для остальных страниц
            });

            const html = await response.text();
            const regex = /<img src="data\/files\/images\/lady\/maill\/[^\/]+\/([^"]+)"[^>]*>/g;
            let match;

            while ((match = regex.exec(html)) !== null) {
                const [, fileName] = match;
                photoUrls.push(`data/files/images/lady/maill/user_${ladyId}/${fileName}`);
            }

            hasNextPage = html.includes('Следующая');

            page++;
        }

        setPhotoUrls(photoUrls.map(url => url.replace('/small_', '/')));
    };

    useEffect(() => {
        fetchPhotoUrls();
    }, []);

    useEffect(() => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoUrl(photoUrls[selectedPhotoIndex]);
        }
    }, [selectedPhotoIndex, photoUrls]);

    return (
        <div style={{marginTop: '10px'}}>
                {photoUrls.map((photoUrl, index) => (
                    <span
                        key={index}
                        onClick={() => setSelectedPhotoIndex(index)}
                        className={selectedPhotoIndex === index ? 'selected' : ''}
                    >
                        <img className={'img-in-letter'} src={photoUrl} alt={`Фото ${index}`} />
                    </span>
                ))}
        </div>
    );
};

export default GetPhotos;
