import "./ContactMe.css";
import FusrtRecord from "../Images/decoration/FusrtRecord.png";

const ContactMe = () => {
  return (
    <>
      <section id="contact ">
        <div className="contact-me2">
          <div className="contactme-t1 pb-3">
          <div className="about-dots1COnt">
                  <img src={FusrtRecord} alt="" />
                </div>
          </div>
          <div className="contact-me2-dec"></div>
          <div class="row align-items-center mb-5">
            <div class="col-lg-5 col-md-12">
              <div class="work-togather-text">
                <h2 class="h2-title text-white ">Швидкий запис на сервіс</h2>
                <p>
                 
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-7">
              <div class="work-togather-form">
                <input
                  type="text"
                  name="name"
                  class="form-input-one subscribe-input"
                  placeholder="Name"
                  required=""
                />
              </div>
              <div><p></p></div>
              <div class="work-togather-form">
                <input
                  type="tel"
                  name="phone"
                  class="form-input-one subscribe-input"
                  placeholder="Phone Number"
                  required=""
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
              </div>
              <div><p></p></div>
              <div class="work-togather-form">
                <input
                  type="email"
                  name="Email"
                  class="form-input-one subscribe-input"
                  placeholder="Email Address"
                  required=""
                />
              </div>
              <div><p></p></div>
              <div class="work-togather-form">
                <input
                  type="date"
                  name="trip-start"
                  class="form-input-one subscribe-input"
                  placeholder="Date and time of recording"
                  min="2022-01-01" max="2024-12-31"
                  required 
                />
              </div>
            </div>
            <div class="col-lg-3 col-md-4">
              <div class="work-togather-form-btn">
              <div><p></p></div>
                <button type="submit" class="sec-btn">
                Подать заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMe;
