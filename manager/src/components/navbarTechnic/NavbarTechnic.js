import {  Link, NavLink  } from "react-router-dom";
import './NavbarTechnic.css';

function NavbarTechnic() {
  return (
    <nav className="line__menu">

      <li className="line__item"><NavLink className="line__link-item" to='technician/detail'>Detail</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='technician/categoryDetail'>CategoryDetail</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='technician/technicianPage'>TechnicianPage</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='technician/work'>Work</NavLink></li>

    </nav>
  );
}
export default NavbarTechnic;
