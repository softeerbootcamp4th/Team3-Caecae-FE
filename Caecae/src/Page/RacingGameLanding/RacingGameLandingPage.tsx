import Navigation from "../../Widget/Navigation/Navigation";
import EventIntro from "./Sections/EventIntro";
import HowToEvent from "./Sections/HowToEvent";
import GiftInfo from "./Sections/GiftInfo";
import EventPeriod from "./Sections/EventPeriod";
import EventPrecaution from "./Sections/EventPrecaution";
import Footer from "../../Widget/Footer/Footer";

const RacingGameLandingPage = () => {
    return (
        <>
          <Navigation />
          <EventIntro />
          <HowToEvent />
          <GiftInfo />
          <EventPeriod />
          <EventPrecaution />
          <Footer />
        </>
    );
};

export default RacingGameLandingPage;