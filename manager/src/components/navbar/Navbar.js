import {  Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="line__menu">
      <li className="line__item"> <Link className="line__link-item" to='/category'>Category</Link></li>
      <li className="line__item"><Link className="line__link-item" to='/detailList'>DetailList</Link></li>
      <li className="line__item"><Link className="line__link-item" to='/warehouse'>Warehouse</Link></li>
    </nav>
  );
}
export default Navbar;
