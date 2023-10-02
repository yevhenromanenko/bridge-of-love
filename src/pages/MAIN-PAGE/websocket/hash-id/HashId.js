//
// const HashId = ((document.cookie.split(`PHPSESSID=`) || [])[1] || '').split(';')[0];
//
// export default HashId;

//
// const getHashIdFromCookie = () => {
//     const cookies = document.cookie.split(';');
//     const phpSessIdCookie = cookies.find((cookie) => cookie.trim().startsWith('PHPSESSID='));
//     const hashId = phpSessIdCookie ? phpSessIdCookie.split('PHPSESSID=')[1].trim() : '';
//     return hashId;
// };
//
// export default getHashIdFromCookie;
