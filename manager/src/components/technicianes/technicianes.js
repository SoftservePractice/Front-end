import "../../App.css";
import NavbarTechnic from "../navbarTechnic/NavbarTechnic";
import Main from "../main/Main";
import Detail from "../detail/Detail";
import Error404 from "../Erros404/Erros404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import CategoryDetails from "../CategoryDetails";

function Tecninec() {
  return (
    <>
      <div className="wrapper">
        <h1 className="title">Technician Page</h1>
        <section className="block">
          <Router>
            <div className="line">
              <NavbarTechnic />
            </div>
            <section className="main">
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/detail" element={<Detail />} />
                <Route exact path="/categoryDetail" element={<CategoryDetails />} />
                <Route path="/*" element={<Error404 />}></Route>
              </Routes>
            </section>
          </Router>
        </section>
      </div>
    </>
  );
}

export default Tecninec;
