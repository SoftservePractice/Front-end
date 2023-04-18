import "./Services.css";
import { useEffect, useState } from "react";
import shap from "../Images/decoration/Shap.png";
const Services = () => {


  useEffect(() => {
  
  });

  return (
    <>
      <section id="services">
        <div className="service-container">
          <div className="service-title">
            <h2>Какие  услуши мы предлагаем вам</h2>

            <h3>Services</h3>
          </div>

          <div className="service-row">
         
                <div
                  className=" my-service"
                  data-aos="zoom-in-up"
                  data-aos-duration="1500"
                >
                  <div className="ser-back">
                    <img src={shap} alt="" />
                  </div>
                  <h4 className="web">Sevic</h4>
                  <img src={shap} alt="" />
                  <p className="service-info">{}</p>
                  
                  <div class="shadow-icon">
                    
                  </div>
                </div>
                <div
                  className=" my-service"
                  data-aos="zoom-in-up"
                  data-aos-duration="1500"
                >
                  <div className="ser-back">
                    <img src={shap} alt="" />
                  </div>
                  <h4 className="web">Sevic</h4>
                  <img src={shap} alt="" />
                  <p className="service-info">{}</p>
            
                  <div class="shadow-icon">
                    
                  </div>
                </div>
                <div
                  className=" my-service"
                  data-aos="zoom-in-up"
                  data-aos-duration="1500"
                >
                  <div className="ser-back">
                    <img src={shap} alt="" />
                  </div>
                  <h4 className="web">Sevic</h4>
                  <img src={shap} alt="" />
                  <p className="service-info">{}</p>
                
                  <div class="shadow-icon">
                    
                  </div>
                </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
