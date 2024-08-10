import Navigation from "../../components/common/Navigation";
import {
  EventIntro, 
  HowToEvent, 
  GiftInfo, 
  EventPeriod, 
  EventPrecaution,
 } from "../../features/RacingGameLanding";
import Footer from "../../components/common/Footer";

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