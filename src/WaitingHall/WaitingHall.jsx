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
                 <h1 className="about-senss">Зал Ожидания</h1>
                <div className="about-dots1">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-shady">
                  <img src={Zal} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-texts" >
                  <div className="title">
                    <h3>Оборудованные зоны отдыха и кухня</h3>
                    <h3>Чай</h3>
                    <h3>Кофе</h3>
                  </div>
                  <div className="about-description">
                    <div id="foo" unselectable="on" class="unselectable">
                      <div
                      
                      />
                    </div>
                  </div>

                  <div className="itscv">
                    <a
                      href="1"
                      download="RESUME.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;