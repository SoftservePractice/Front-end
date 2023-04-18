import "./MoveFriends.css";
import { useEffect, useState } from "react";
import decor1 from "../Images/decoration/Podlojka.png";
import Vorker from "../Images/decoration/moveFriends.png";

const AboutUS = () => {
  


  useEffect(() => {
  },);

  return (
    <>
      
        
          <main id="about" >
            <div className="aboutMe-containerMov">
              <div className="about-decor">
                 <h1 className="about-senssHow">Приведи друга</h1>
                <div className="about-dots1M">
                  <img src={decor1} alt="" />
                </div>
                <div className="about-shady">
                  <img src={Vorker} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsF" >
                  <div className="title">
                    <h3>Подарите себе и друзья возможность </h3>
                    <h3>сделать заказ со скидкой 10%</h3>
                    <h3>Порекомендуй нас и получи свой бонус</h3>


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