import { useState } from 'react';

function Categories() {
  const [activeIndex, setactiveIndex] = useState(0);
  const categoriesArr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  function handleCategoryClick(i) {
    setactiveIndex(i);
  }

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((title, i) => (
          <li
            className={i === activeIndex ? 'active' : ''}
            onClick={() => handleCategoryClick(i)}
            key={title}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
