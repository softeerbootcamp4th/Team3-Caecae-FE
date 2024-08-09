import Navigation from "../../Widget/Navigation/Navigation";
import EventIntro from "./RacingGameLading/EventIntro";
import HowToEvent from "./RacingGameLading/HowToEvent";
import GiftInfo from "./RacingGameLading/GiftInfo";
import EventPeriod from "./RacingGameLading/EventPeriod";
import EventPrecaution from "./RacingGameLading/EventPrecaution";
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