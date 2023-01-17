import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/Skeleton';
import Sort from '../components/Sort';

function Home() {
  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortItem, setSortItem] = useState({ name: 'популярності', value: 'rating' });

  useEffect(() => {
    setIsloading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue !== '' ? `&search=${searchValue}` : '';
    fetch(
      `https://63c2a19ae3abfa59bdb03314.mockapi.io/pizzasapi/pizzas?sortBy=${sortItem.value}${category}${search}`
    )
      .then(resp => resp.json())
      .then(resp => {
        setItems(resp);
        setIsloading(false);
      });
  }, [categoryId, sortItem, searchValue]);
  return (
    <>
      <div className="content__top">
        <Categories id={categoryId} setId={id => setCategoryId(id)} />
        <Sort sortedValue={sortItem.name} setSortedValue={id => setSortItem(id)} />
      </div>
      <h2 className="content__title">Обери свій улюблений смак</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : items.map(({ id, title, price, imageUrl, sizes, types }) => (
              <PizzaCard
                key={id}
                title={title}
                price={price}
                image={imageUrl}
                sizes={sizes}
                types={types}
              />
            ))}
      </div>
    </>
  );
}
export default Home;
