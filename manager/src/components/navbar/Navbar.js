import {  Link, NavLink  } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="line__menu">
      <li className="line__item"> < NavLink  className="line__link-item" to='/category'>Category</ NavLink ></li>
      <li className="line__item">< NavLink  className="line__link-item" to='/detailList'>DetailList</ NavLink ></li>
      <li className="line__item"><NavLink className="line__link-item" to='/warehouse'>Warehouse</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='/work'>Work</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='/client'>Client</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='/order'>Order</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='/car'>Car</NavLink></li>
    </nav>
  );
}
export default Navbar;
