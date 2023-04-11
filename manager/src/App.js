import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import DetailList from "./components/detailList/DetailList";
import Warehouse from "./components/warehouse/Warehouse";
import Category from "./components/category/Category";
import Detail from "./components/detail/Detail";
import Error404 from "./components/Erros404/Erros404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
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
                <Route exact path="/detailList/:id" element={<Detail/>} />
                <Route path="/*" element={<Error404 />}></Route>
              </Routes>
            </section>
          </Router>
        </section>
      </div>
    </>
  );
}

export default App;