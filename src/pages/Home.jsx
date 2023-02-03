import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import QueryString from 'qs';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/Skeleton';
import Sort, { sortListArr } from '../components/Sort';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { selectCategoryId, selectPizzas, selectSearchValue, selectSort } from '../redux/selectors';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = useSelector(selectCategoryId);
  const sort = useSelector(selectSort);
  const searchValue = useSelector(selectSearchValue);
  const { items, status } = useSelector(selectPizzas);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      const sort = sortListArr.find(obj => obj.value === params.sort);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchData();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const qeryParams = () => {
        if (!searchValue) {
          return { sort: sort.value, categoryId };
        }
        return { searchValue, sort: sort.value, categoryId };
      };
      const queryString = QueryString.stringify(qeryParams());

      navigate(`?${queryString}`);
    }
    isMounted.current = false;
  }, [categoryId, sort, searchValue, navigate]);

  async function fetchData() {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchPizzas({ category, search, sort }));
  }

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
        {status === 'LOADING' && [...new Array(4)].map((_, i) => <Skeleton key={i} />)}
        {status === 'SUCCESS' && items.map(obj => <PizzaCard key={obj.id} {...obj} />)}
        {status === 'ERROR' && <h2>Помилка з'єднання</h2>}
      </div>
    </>
  );
}
export default Home;
