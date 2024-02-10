import {Outlet, Link} from "react-router-dom";

const Layout = () =>{
  return (<div>
    <nav>
        <ul>
            <li>
                <Link to="/">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
    <Outlet />
  </div>
  )
}

export default Layout;
