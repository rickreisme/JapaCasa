import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outlet } from "react-router-dom";

import './assets/styles/global.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App