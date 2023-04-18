import "../../App.css";
import Navbar from "../navbar/Navbar";
import Main from "../main/Main";
import DetailList from "../detailList/DetailList";
import Warehouse from "../warehouse/Warehouse";
import Category from "../category/Category";
import Detail from "../detail/Detail";
import Error404 from "../Erros404/Erros404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Work from "../work/Work";
import Client from "../client/Client";
import Order from "../order/Order";
import WorkList from "../workList/WorkList";
import Car from "../car/Car";
import Technician from "../technician/Technician";

import CategoryDetails from "../CategoryDetails";

function Manager() {
  return (
    <>
      <div className="wrapper">
        <h1 className="title">Manager Page</h1>
        <section className="block">
          <Router>
            <div className="line">
              <Navbar />
            </div>
            <section className="main">
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/category" element={<Category />} />
                <Route exact path="/detailList" element={<DetailList />} />
                <Route exact path="/warehouse" element={<Warehouse />} />
                <Route exact path="/detail" element={<Detail />} />
                <Route exact path="/work" element={<Work />} />
                <Route exact path="/client" element={<Client />} />
                <Route exact path="/order" element={<Order />} />
                <Route exact path="/car" element={<Car />} />
                <Route exact path="/worklist" element={<WorkList />} />
                <Route exact path="/technician" element={<Technician />} />
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

export default Manager;
