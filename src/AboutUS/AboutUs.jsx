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
                <div className="about-dotsUU">
                  <img src={shap} alt="" />
                </div>
                <div className="about-shadyUU">
                  <img src={shady} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsUss" >
                  <div className="title">
                    <h2>Звернись до механіка не розводь паніку</h2>
                    <h3>З повагою до Вас із любов'ю до автомобіля!</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;