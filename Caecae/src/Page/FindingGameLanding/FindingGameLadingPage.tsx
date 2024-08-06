import Footer from "../../Widget/Footer/Footer";
import Navigation from "../../Widget/Navigation/Navigation";
import EventPeriod from "./Sections/EventPeriod";
import HowToEvent from "./Sections/HowToEvent";
import LadingPageTitle from "./Sections/LadingPageTitle";
import SelectionMethod from "./Sections/SelectionMethod";

const FindingGameLadingPage = () => {
  return (
    <>
      <Navigation />
      <LadingPageTitle />
      <HowToEvent />
      <SelectionMethod />
      <EventPeriod />
      <Footer />
    </>
  );
};

export default FindingGameLadingPage;
