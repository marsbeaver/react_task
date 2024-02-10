import ReactDOM from 'react-dom/client';
export default function Home(){
  return(
    <h1>Home</h1>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);
