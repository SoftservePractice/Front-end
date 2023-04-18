import "./Footer.css";
import { useEffect, useState } from "react";
import decor1 from "../Images/decoration/BackGr.png";
import shap from "../Images/decoration/logo/Logo.png";
import shady from "../Images/decoration/CarMark.png";
const AboutUS = () => {
  






  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-containerFut">
              <div className="about-decor">
                <div className="about-dots1Fut">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-dotsFut">
                  <img src={shap} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsFut" >
                  <div className="title">
                    <h2>+3800058546</h2>
                    <h2>+3809532415</h2>
                  </div>
                  <div className="about-description">
                    <div id="foo" unselectable="on" class="unselectable">
                      <div/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;