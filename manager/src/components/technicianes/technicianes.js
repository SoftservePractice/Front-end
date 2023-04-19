import "../../App.css";
import NavbarTechnic from "../navbarTechnic/NavbarTechnic";
import Main from "../main/Main";
import Detail from "../detail/Detail";
import Error404 from "../Erros404/Erros404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import CategoryDetails from "../CategoryDetails";
import TechnicianPage from "../TechnicianPage";

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
                <Route exact path="technician/" element={<Main />} />
                <Route exact path="/technician/detail" element={<Detail/>} />
                <Route exact path="technician/categoryDetail" element={<CategoryDetails />} />
                <Route exact path="technician/technicianPage" element={<TechnicianPage />} />
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
