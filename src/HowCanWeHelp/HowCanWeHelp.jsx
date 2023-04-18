import "./HowCanWeHelp.css";
import { useEffect, useState } from "react";
import decor1 from "../Images/decoration/BackGr.png";
import Vorker from "../Images/decoration/Vorker.png";
import USfon from "../Images/decoration/USfon.png";

const AboutUS = () => {
  
  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-containerHow">
              <div className="about-decor">
                 <h1 className="about-senssHows">ЧИМ МОЖЕМО ДОПОМОГТИ</h1>
                <div className="about-dots1H">
                  <img src={decor1} alt="" />
              
                </div>
                <div className="about-shadyHW">
                  <img src={Vorker} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsHow" >
                  <div className="title">
                    <h3>Регламентне технічне обслуговування</h3>
                    <h3>Заміна моторної та трансмісійної олії</h3>
                    <h3>Діагностика та заміна технічних рідин</h3>
                    <h3>Діагностика та ремонт двигуна</h3>
                    <h3>Діагностика та ремонт трансмісії</h3>
                    <h3>Діагностика та ремонт ходової частини</h3>
                    <h3>Діагностика та ремонт гальмівної системи</h3>
                    <h3>Діагностика та ремонт паливної системи</h3>
                    <h3>Діагностика та ремонт електроустаткування</h3>
                    <h3>Діагностика та ремонт кондиціювання</h3>
                    <h3>Діагностика та ремонт системи запалення</h3>
                    <h3>Шиномонтажні роботи</h3>
                    <h3>Перевірка та регулювання геометрії кутів установки коліс</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;