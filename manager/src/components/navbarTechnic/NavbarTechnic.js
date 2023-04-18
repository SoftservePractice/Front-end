import {  Link, NavLink  } from "react-router-dom";
import './NavbarTechnic.css';

function NavbarTechnic() {
  return (
    <nav className="line__menu">
     
      <li className="line__item"><NavLink className="line__link-item" to='/detail'>Detail</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='/categoryDetail'>CategoryDetail</NavLink></li>
      

    </nav>
  );
}
export default NavbarTechnic;
