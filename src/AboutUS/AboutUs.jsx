import "./AboutUs.css";
import { useEffect, useState } from "react";
import decor1 from "../Images/decoration/USfon.png";
import shap from "../Images/decoration/Shap.png";
import shady from "../Images/decoration/CarMark.png";

const AboutUS = () => {
  






  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-container">
              <div className="about-decor">
                <div className="about-dots1Us">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-dots">
                  <img src={shap} alt="" />
                </div>
                <div className="about-shady">
                  <img src={shady} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-texts" >
                  <div className="title">
                    <h2>Обратись к механику не разводи напику</h2>
                    <h3>С уважением к Вам  с любовью к автомобилю!</h3>
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