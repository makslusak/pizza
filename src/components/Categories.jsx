function Categories({ id, setId }) {
  const categoriesArr = ['Всі', "М'ясні", 'Вегетеріанські', 'Гриль', 'Гострі'];

  function handleCategoryClick(i) {
    setId(i);
  }

  return (
    <div className="categories">
      <ul>
        {categoriesArr.map((title, i) => (
          <li
            className={i === id ? 'active' : ''}
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
