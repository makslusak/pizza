import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PizzaPage from './pages/PizzaPage';
import './scss/app.scss';

export const AppContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:pizzaId" element={<PizzaPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
