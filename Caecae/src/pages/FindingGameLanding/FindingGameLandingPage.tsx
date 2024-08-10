import { useRef } from "react";
import Footer from "../../components/common/Footer";
import Navigation from "../../components/common/Navigation";
import {
  EventPeriod,
  HowToEvent,
  LadingPageTitle,
  OpenEvent,
  SelectionMethod,
} from "../../features/FindingGameLanding";

const FindingGameLandingPage = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToElement = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navigation />
      <LadingPageTitle onClick={scrollToElement} />
      <HowToEvent />
      <SelectionMethod />
      <EventPeriod />
      <OpenEvent ref={targetRef} />
      <Footer />
    </>
  );
};

export default FindingGameLandingPage;
