import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import QueryString from 'qs';

import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaCard from '../components/PizzaCard';
import Skeleton from '../components/Skeleton';
import Sort, { sortListArr } from '../components/Sort';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sort = useSelector(state => state.filter.sort);
  const searchValue = useSelector(state => state.filter.searchValue);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
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

  function fetchData() {
    setIsloading(true);
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://63c2a19ae3abfa59bdb03314.mockapi.io/pizzasapi/pizzas?sortBy=${sort.value}${category}${search}`
      )
      .then(resp => {
        setItems(resp.data);
        setIsloading(false);
      });
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
        {isLoading
          ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          : items.map(obj => <PizzaCard key={obj.id} {...obj} />)}
      </div>
    </>
  );
}
export default Home;
