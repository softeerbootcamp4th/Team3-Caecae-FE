import Footer from "../../components/common/Footer/index";
import Navigation from "../../components/common/Navigation/index";
import {
  EventInfoTitle,
  ShowCasper,
  CasperFeature,
  DarkTeaserCasper,
  GoToEvent,
} from "../../features/EventInfoLanding";

const EventInfoLandingPage = () => {
  return (
    <>
      <Navigation />
      <EventInfoTitle />
      <ShowCasper />
      <CasperFeature />
      <DarkTeaserCasper />
      <GoToEvent />
      <Footer />
    </>
  );
};

export default EventInfoLandingPage;
