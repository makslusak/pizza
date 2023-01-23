import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImage from '../assets/img/empty-cart.png';

function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>Кошик порожній 😕</h2>
      <p>
        Ви ще не обрали піцу.
        <br />
        Для того, щоб замовити піцу перейдіть на головну сторінку.
      </p>
      <img src={emptyCartImage} alt="Empty cart" />
      <Link to="/" className="button button--outline button--add go-back-btn">
        <span>Повернутись назад</span>
      </Link>
    </div>
  );
}
export default CartEmpty;
