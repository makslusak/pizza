import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, minusItem } from '../redux/slices/cartSlice';

function CartItem({ obj }) {
  const dispatch = useDispatch();

  function handlePlusPizza() {
    dispatch(addItem(obj));
  }
  function handleMinusPizza() {
    dispatch(minusItem(obj));
  }
  function handleRemovePizza() {
    dispatch(removeItem(obj.id));
  }

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={obj.imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{obj.title}</h3>
        <p>
          {obj.type}, {obj.size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={handleMinusPizza}
          type="button"
          className="button button--outline button--circle cart__item-count-minus"
        >
          -
        </button>
        <b>{obj.count}</b>
        <button
          onClick={handlePlusPizza}
          type="button"
          className="button button--outline button--circle cart__item-count-plus"
        >
          +
        </button>
      </div>
      <div className="cart__item-price">
        <b>{obj.count * obj.price} ₴</b>
      </div>
      <div className="cart__item-remove">
        <button
          onClick={handleRemovePizza}
          type="button"
          className="button button--outline button--circle button--del"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g>
              <path d="M22.3,81.9C6.1,65.8,6,39,22.5,22.5C39.1,5.9,65.6,5.9,81.9,22.3L500,440.3L918.1,22.3c16.1-16.1,43-16.3,59.5,0.2c16.6,16.6,16.6,43.1,0.2,59.5L559.7,500l418.1,418.1c16.1,16.1,16.3,43-0.2,59.5c-16.6,16.6-43.1,16.6-59.5,0.2L500,559.7L81.9,977.7c-16.1,16.1-43,16.3-59.5-0.2c-16.6-16.6-16.6-43.1-0.2-59.5L440.3,500L22.3,81.9z" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
export default CartItem;
