import React from 'react';
import { Link } from 'react-router-dom';

function Cart() {
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title"> Кошик</h2>
          <div className="cart__clear">
            <span>Очистити кошик</span>
          </div>
        </div>
        <div className="content__items"></div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Загальна кількість : <b>3 шт.</b>
            </span>
            <span>
              Сума замовлення: <b>900 ₴</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <span>Повернутись назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплата</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
