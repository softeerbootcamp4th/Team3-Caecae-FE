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
import getRacingGameAvailable from "../../stories/getRacingGameAvailable";

const RacingGameLandingPage = () => {
  const [isEventOpen, setIsEventOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRacingGameAvailable();
      const racingGameOpen = response.data;

      if(racingGameOpen === true) {
        setIsEventOpen(true);
      }
    };
    
    fetchData();
  }, []);

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