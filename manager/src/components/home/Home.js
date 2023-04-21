import {  Link, NavLink  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Manager from "../manager/Manager";
import Tecninec from "../technicianes/technicianes";
import Main from "../main/Main";
function Home() {
  return (
    
      <Router>
          
           <nav className="line__menu">
      <li className="line__item"> < NavLink  className="line__link-item" to='/manager'>Manager</ NavLink ></li>
      <li className="line__item">< NavLink  className="line__link-item" to='/techical'>Techical</NavLink ></li>
      </nav>
            
            
              <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/manager" element={<Manager />} />
                <Route exact path="/techical" element={<Tecninec />} />
                
              </Routes>
          
          </Router>
   
  );
}
export default Home;
