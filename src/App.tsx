import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Contact from './pages/Contact';
import Login from './pages/UserLogin';
import Signup from './pages/UserSignup';
import NewHealthCenter from './pages/NewHealthCenter';


const App: React.FC = () =>  {
  return (<BrowserRouter>
    <main>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/search' element={<Search/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/signup' element={<Signup/>}  />
        <Route path='/profile' element={<NewHealthCenter/>}  />
      </Routes>
      <Footer />
    </main>
    </BrowserRouter>
  );
}

export default App;
