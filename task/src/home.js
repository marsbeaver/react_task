import ReactDOM from 'react-dom/client';
import {Outlet, Link} from "react-router-dom";
const Home=()=>{
  return(
    <div>
      <h1>Home</h1>
      <Link to="/login">Logout</Link>
    </div>
  )
}

export default Home;
