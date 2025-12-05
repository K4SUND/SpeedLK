
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ItemUpload from './Pages/item/ItemUpload';
import Item from './Pages/item/Item';
import UserProfile from './Pages/user/UserProfile';
import ItemUpdate from './Pages/item/ItemUpdate';
import Footer from './Components/Footer';
import About from './Pages/About';
import Services from './Pages/services/Services';
import Layout from './Components/Layout';
import ExchangeCurrency from './Pages/services/ExchangeCurrency';



function App() {
  return (
    <div>


      <Layout>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/item-upload' element={<ItemUpload />}></Route>
            <Route path='/item/:id' element={<Item />}></Route>
            <Route path='/profile' element={<UserProfile tab={'profile'} />}></Route>

            {/* <Route path='/ProfileUpdate' element={<UserProfile activeTab1={'settings'}/>}></Route> */}
            <Route path='/item-update/:id' element={<ItemUpdate />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/services' element={<Services />}></Route>
            <Route path='/exchange-service' element={<ExchangeCurrency />}></Route>





          </Routes>
        </Router>
      </Layout>



      {/* <Footer/>   */}
    </div>
  );
}

export default App;