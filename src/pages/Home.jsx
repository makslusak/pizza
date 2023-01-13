import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/Skeleton';
import Sort from '../components/Sort';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/2760305e-f90d-4ad6-87b3-28bbcf9ead2a')
      .then(resp => resp.json())
      .then(resp => {
        setItems(resp);
        setIsloading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton />)
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
