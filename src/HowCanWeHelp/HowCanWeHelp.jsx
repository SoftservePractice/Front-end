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
                 <h1 className="about-senssHows">ЧЕМ МОЖЕМ ПОМОЧЬ</h1>
                <div className="about-dots1H">
                  <img src={decor1} alt="" />
              
                </div>
                <div className="about-shady">
                  <img src={Vorker} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsHow" >
                  <div className="title">
                    <h3>Регламентное техническое обслуживание</h3>
                    <h3>Замена моторного и трансмиссионного масла</h3>
                    <h3>Диагностика и замена технических жидкостей</h3>
                    <h3>Диагностика и ремонт двигателя</h3>
                    <h3>Диагностика и ремонт трансмиссии</h3>
                    <h3>Диагностика и ремонт ходовой части</h3>
                    <h3>Диагностика и ремонт тормозной системы</h3>
                    <h3>Диагностика и ремонт топливной системы</h3>
                    <h3>Диагностика и ремонт электрооборудования</h3>
                    <h3>Диагностика и ремонт кондиционирования</h3>
                    <h3>Диагностика и ремонт системы зажигания</h3>
                    <h3>Шиномонтажные работы</h3>
                    <h3>Проверка и регулировка геометрии углов установки колес</h3>
                    <h3>Продажа и установка дополнительного оборудования</h3>
                    <h3>Продажа, установка и ремонт ГБО</h3>
                    <h3>Проведение антикоррозионной обработки</h3>
                    <h3>Продажа оригинальных и неоригинальных запчастей.</h3>
                    <h3>Тонирование стекла</h3>
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