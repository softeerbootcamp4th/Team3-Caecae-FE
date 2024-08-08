import Footer from "../../Widget/Footer/Footer";
import Navigation from "../../Widget/Navigation/Navigation";
import GoToEvent from "./Sections/GoToEvent";
import ShowCasper1 from "./Sections/ShowCasper1";
import ShowCasper2 from "./Sections/ShowCasper2";
import ShowCasper3 from "./Sections/ShowCasper3";
import ShowCasper4 from "./Sections/ShowCasper4";

const EventInfoLandingPage = () => {
    return (
        <>
            <Navigation />
            <ShowCasper1 />
            <ShowCasper2 />
            <ShowCasper3 />
            <ShowCasper4 />
            <GoToEvent />
            <Footer />
        </>
    );
};

export default EventInfoLandingPage;
