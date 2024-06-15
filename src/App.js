import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Products from './Components/Products';
import ProductDetail from './Components/ProductDetail';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product' element={<Navigate to='/products' />}/>
      </Routes>
      <div id='loading'></div>
    </div>
  );
}

export default App;
