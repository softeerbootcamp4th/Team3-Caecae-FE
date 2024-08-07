import { useRef } from "react";
import Footer from "../../Widget/Footer/Footer";
import Navigation from "../../Widget/Navigation/Navigation";
import EventPeriod from "./Sections/EventPeriod";
import HowToEvent from "./Sections/HowToEvent";
import LadingPageTitle from "./Sections/LadingPageTitle";

import OpenEvent from "./Sections/OpenEvent";
import SelectionMethod from "./Sections/SelectionMethod";

const FindingGameLadingPage = () => {
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

export default FindingGameLadingPage;
