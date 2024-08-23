import { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";
import {
  EventIntro, 
  HowToEvent, 
  GiftInfo, 
  EventPeriod, 
  EventPrecaution,
 } from "../../features/RacingGameLanding";
import Footer from "../../components/common/Footer";
import getRacingGameAvailable from "../../stories/RacingGame/getRacingGameAvailable";

const RacingGameLandingPage = () => {
  const [isEventOpen, setIsEventOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRacingGameAvailable();
      const racingGameOpen = response.data;

      if(racingGameOpen === true) {
        setIsEventOpen(true);
      }else {
        setIsEventOpen(false);
      }
    };
    
    fetchData();
  }, []);

  return (
      <>
        <Navigation />
        <EventIntro isEventOpen={isEventOpen} />
        <HowToEvent />
        <GiftInfo />
        <EventPeriod isEventOpen={isEventOpen} />
        <EventPrecaution />
        <Footer />
      </>
  );
};

export default RacingGameLandingPage;