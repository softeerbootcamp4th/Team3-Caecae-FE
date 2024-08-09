import { useRef } from "react";
import Footer from "../../Widget/Footer/Footer";
import Navigation from "../../Widget/Navigation/Navigation";
import EventPeriod from "./FindingGameLading/EventPeriod";
import HowToEvent from "./FindingGameLading/HowToEvent";
import LadingPageTitle from "./FindingGameLading/LadingPageTitle";

import OpenEvent from "./FindingGameLading/OpenEvent";
import SelectionMethod from "./FindingGameLading/SelectionMethod";

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
