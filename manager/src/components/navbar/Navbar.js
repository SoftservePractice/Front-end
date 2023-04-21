import {  Link, NavLink  } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="line__menu">
      <li className="line__item">< NavLink  className="line__link-item" to='manager/category'>Category</ NavLink ></li>
      <li className="line__item">< NavLink  className="line__link-item" to='manager/detailList'>DetailList</ NavLink ></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/warehouse'>Warehouse</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/work'>Work</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/client'>Client</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/order'>Order</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/detail'>Detail</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/car'>Car</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/worklist'>WorkList</NavLink></li>
      <li className="line__item"><NavLink className="line__link-item" to='manager/technician'>Technician</NavLink></li>

    </nav>
  );
}
export default Navbar;
