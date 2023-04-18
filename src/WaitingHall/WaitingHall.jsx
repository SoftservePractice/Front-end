import "./WaitingHall.css";
import { useEffect, useState } from "react";
import decor1 from "../Images/decoration/BackGr.png";
import Zal from "../Images/decoration/ZalSave.png";

const AboutUS = () => {
  


  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-containerW">
              <div className="about-decor">
                 <h1 className="about-senss">Зал очікуванн</h1>
                <div className="about-dots1">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-shadyWWH">
                  <img src={Zal} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsWWH" >
                  <div className="title">
                    <h3>Обладнані зони відпочинку та кухня</h3>
                    <h3>Чай</h3>
                    <h3>Кава</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;