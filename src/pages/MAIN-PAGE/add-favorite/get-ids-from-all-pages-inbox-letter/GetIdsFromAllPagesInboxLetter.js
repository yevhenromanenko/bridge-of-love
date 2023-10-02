import GetIdsFromOnePage from "../get-ids-from-one-page/GetIdsFromOnePage";


const GetAllIdsFromPagesInboxLetter = async () => {

    const baseUrl = 'https://www.bridge-of-love.com/index.php?app=message&act=inbox';
    const ids = [];

    let currentPage = 1;
    let idsOnPage;

    do {
        const pageUrl = currentPage === 1 ? baseUrl : `${baseUrl}&page=${currentPage}`;
        idsOnPage = await GetIdsFromOnePage(pageUrl);

        for (const id of idsOnPage) {
            if (!ids.includes(id)) {
                ids.push(id);
            }
        }
        await new Promise(resolve => setTimeout(resolve, 200));
        currentPage++;
    } while (idsOnPage.length > 0);

     return ids;
};

export default GetAllIdsFromPagesInboxLetter;
