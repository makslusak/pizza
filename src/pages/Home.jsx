import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AppContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/Skeleton';
import Sort from '../components/Sort';

function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sort = useSelector(state => state.filter.sort);
  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  // const [sortItem, setSortItem] = useState({ name: 'популярності', value: 'rating' });

  useEffect(() => {
    setIsloading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue !== '' ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://63c2a19ae3abfa59bdb03314.mockapi.io/pizzasapi/pizzas?sortBy=${sort.value}${category}${search}`
      )
      .then(resp => {
        setItems(resp.data);
        setIsloading(false);
      });
  }, [categoryId, sort, searchValue]);

  function handleCategoryChange(id) {
    dispatch(setCategoryId(id));
  }
  return (
    <>
      <div className="content__top">
        <Categories id={categoryId} setId={id => handleCategoryChange(id)} />
        <Sort />
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
