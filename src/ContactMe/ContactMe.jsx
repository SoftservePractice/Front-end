import "./ContactMe.css";
import FusrtRecord from "../Images/decoration/FusrtRecord.png";
import { useEffect,useState } from "react";




const ContactMe = () => {
const [inputnamee, setInputnamee] = useState('');
const [inputphone, setInputphone] = useState('');
const [inputemail, setInputemail] = useState('');
const [inputdate, setInputdate] = useState('');
const [id, setid] = useState(0);

  async function AddData() {
    fetch("http://vanl0076115.online-vm.com/order/", {
      method: 'Post', 
      headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
          'name': inputnamee,
          'phone': inputphone,
          'email': inputemail,
          'date': inputdate,
      })
  }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setid(data.id)
      })
      }
  })
  }
  

  useEffect(() => {
    if(id!=0){
    //document.location.href =`https://t.me/WrrrumService_bot?start=${id}`
    window.open(`https://t.me/WrrrumService_bot?start=${id}`);
    }
}, [id])

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
                  value={inputnamee}
                  onChange={(e)=>setInputnamee(e.target.value)}    
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
                  value={inputphone}
                  onChange={(e)=>setInputphone(e.target.value)}    
                  required=""
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
              </div>
              <div><p></p></div>
              <div class="work-togather-form">
                <input
                  type="email"
                  name="email"
                  class="form-input-one subscribe-input"
                  placeholder="Email Address"
                  value={inputemail}
                  onChange={(e)=>setInputemail(e.target.value)}    
                />
              </div>
              <div><p></p></div>
              <div class="work-togather-form">
                <input
                  type="date"
                  name="date"
                  class="form-input-one subscribe-input"
                  placeholder="Date and time of recording"
                  min="2022-01-01" max="2024-12-31"
                  value={inputdate}
                  onChange={(e)=>setInputdate(e.target.value)}    
                  required 
                />
              </div>
            </div>
            <div class="col-lg-3 col-md-4">
              <div class="work-togather-form-btn">
              <div><p></p></div>
                <button type="submit" onClick={AddData} class="sec-btn">
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
