import logo from './logo.svg';
import './App.css';
import AboutUS from "./AboutUS/AboutUs";
import Servisec from "./Services/Services";
import Contact from "./ContactMe/ContactMe";
import WaitingHall from "./WaitingHall/WaitingHall";
import HowCanWeHelp from "./HowCanWeHelp/HowCanWeHelp";
import AutoCare from "./AutoCare/AutoCare";
import MoveFriends from "./MoveFriends/MoveFriends";
import Footer from "./Footer/Footer";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter> 
    <AboutUS />
    <Servisec />
    <HowCanWeHelp/>
    <AutoCare/>
    <WaitingHall />
    <MoveFriends />
    <Contact />
    <Footer />
     </BrowserRouter>
    </>
  );
}

export default App;
