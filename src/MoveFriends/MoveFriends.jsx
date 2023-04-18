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
                <div className="about-shadyMF">
                  <img src={Vorker} alt="" />
                </div>
              </div>
              <div >
                <div
                  className="about-textsF" >
                  <div className="title">
                    <h3>Подаруйте собі та друзі можливість </h3>
                    <h3>зробити замовлення зі знижкою 10%</h3>
                    <h3>Рекомендуй нас та отримай свій бонус</h3>
                  </div>
                </div>
              </div>
            </div>
          </main>
        
    </>
  );
};

export default AboutUS;