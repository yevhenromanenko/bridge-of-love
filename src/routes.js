import MainPage from "./pages/MAIN-PAGE/MainPage";

export const useRoutes = () => {

    if (window.location.href.includes('chat')) {
        return (
            <>
                <MainPage/>
            </>
        );
    }
}
