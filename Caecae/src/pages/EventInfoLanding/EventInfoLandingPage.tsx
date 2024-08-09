import Footer from "../../components/common/Footer/index";
import Navigation from "../../components/common/Navigation/index";
import {
  GoToEvent,
  ShowCasper1,
  ShowCasper2,
  ShowCasper3,
  ShowCasper4,
} from "../../features/Main";

const EventInfoLandingPage = () => {
  return (
    <>
      <Navigation />
      <ShowCasper1 />
      <ShowCasper2 />
      <ShowCasper3 />
      <ShowCasper4 />
      <GoToEvent />
      <Footer />
    </>
  );
};

export default EventInfoLandingPage;
