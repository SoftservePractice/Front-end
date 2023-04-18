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
                 <h1 className="about-senssCare">Не хвилюйтеся, Ви в надійних руках!</h1>
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
                    <h3>Обслуговування в AUTO CARE це просто, швидко і якісно!</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;