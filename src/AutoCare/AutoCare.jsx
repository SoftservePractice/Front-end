import "./AutoCare.css";
import { useEffect, useState } from "react";
import Podlojka from "../Images/decoration/Podlojka.png";
import BarTick from "../Images/decoration/BarTick.png";

const AboutUS = () => {
  





  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-containerCare">
              <div className="about-decor">
                 <h1 className="about-senssCare">Не переживайте, Вы в надежных руках!</h1>
                <div className="about-dots1Car">
                  <img src={Podlojka} alt="" />
                </div>
                <div className="about-shadyCar">
                  <img src={BarTick} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsCareC" >
                  <div className="title">
                    <h3>Обслуживание в AUTO CARE— это просто, быстро и качественно!</h3>
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