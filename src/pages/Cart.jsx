import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartEmpty from '../components/CartEmpty';
import CartItem from '../components/CartItem';
import { clearItems } from '../redux/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const itemsInCart = useSelector(state => state.cart.items);
  const totalCount = itemsInCart.reduce((sum, item) => sum + item.count, 0);
  function handleRestoreCart() {
    dispatch(clearItems());
  }
  if (!totalCount) {
    return <CartEmpty />;
  }
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title"> Кошик</h2>
          <div onClick={handleRestoreCart} className="cart__clear">
            <span>Очистити кошик</span>
          </div>
        </div>
        <div className="content__items">
          {itemsInCart.map(obj => (
            <CartItem key={obj.id} obj={obj} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Загальна кількість : <b>{totalCount} шт.</b>
            </span>
            <span>
              Сума замовлення: <b>{totalPrice} ₴</b>
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
