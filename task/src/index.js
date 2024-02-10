import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignUp from './sign_up';
import Login from './login';
import Layout from './layout';
import Home from './home';
export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<SignUp/>}/>
          <Route path="login" element={<Login/>}/>
        </Route>
        <Route path="home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
