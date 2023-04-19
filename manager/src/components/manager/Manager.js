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
  const url = document.URL
  return (
    <>
      <div className="wrapper">
        <h1 className="title">Manager Page</h1>
        <section className="block">
          <Router>
            <div className="line">
              <Navbar />
              {url}
            </div>
            <section className="main">
              <Routes>
                <Route exact path="manager/" element={<Main />} />
                <Route exact path="manager/category" element={<Category />} />
                <Route exact path="manager/detailList" element={<DetailList />} />
                <Route exact path="manager/warehouse" element={<Warehouse />} />
                <Route exact path="manager/detail" element={<Detail />} />
                <Route exact path="manager/work" element={<Work />} />
                <Route exact path="manager/client" element={<Client />} />
                <Route exact path="manager/order" element={<Order />} />
                <Route exact path="manager/car" element={<Car />} />
                <Route exact path="manager/worklist" element={<WorkList />} />
                <Route exact path="manager/technician" element={<Technician />} />
                <Route exact path="manager/categoryDetail" element={<CategoryDetails />} />
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
