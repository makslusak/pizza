import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function PizzaPage() {
  const [pizza, setPizza] = useState('');
  const { pizzaId } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63c2a19ae3abfa59bdb03314.mockapi.io/pizzasapi/pizzas/${pizzaId}`
        );
        setPizza(data);
      } catch (error) {}
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <p>Завантаження...</p>;
  }
  return (
    <div className="container">
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Повернутись назад</span>
      </Link>
      <div>
        <img src={pizza.imageUrl} alt="піца" />
        <h2>{pizza.title}</h2>
        <p>{pizza.desc}</p>
      </div>
    </div>
  );
}
export default PizzaPage;
