import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../redux/slices/cartSlice';

function PizzaCard({ id, title, price, imageUrl, sizes, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ['тонке', 'традиційне'];
  const dispatch = useDispatch();
  const itemInCart = useSelector(state => state.cart.items.find(obj => obj.id === id));
  const countInCart = itemInCart ? itemInCart.count : 0;

  function handleAddItem() {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  }

  function handleTypeChange(t) {
    setActiveType(t);
  }
  function handleSizeChange(s) {
    setActiveSize(s);
  }

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>

      <Link to={`/pizza/${id}`}>
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map(type => {
            return types.length === 1 ? (
              <li key={type} className="active">
                {typeNames[type]}
              </li>
            ) : (
              <li
                key={type}
                onClick={() => handleTypeChange(type)}
                className={activeType === type ? 'active' : '' + types.length === 1 ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              onClick={() => handleSizeChange(i)}
              className={activeSize === i ? 'active' : ''}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} ₴</div>
        <button onClick={handleAddItem} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {countInCart > 0 && <i>{countInCart}</i>}
        </button>
      </div>
    </div>
  );
}
export default PizzaCard;
