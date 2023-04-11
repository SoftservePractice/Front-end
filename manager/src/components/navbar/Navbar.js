import {  Link, NavLink  } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="line__menu">
      <li className="line__item"> < NavLink  className="line__link-item" to='/category'>Category</ NavLink ></li>
      <li className="line__item">< NavLink  className="line__link-item" to='/detailList'>DetailList</ NavLink ></li>
      <li className="line__item"><NavLink className="line__link-item" to='/warehouse'>Warehouse</NavLink></li>
    </nav>
  );
}
export default Navbar;
