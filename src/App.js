import './App.css';
import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard';
import './scss/app.scss';
import pizzasArr from './assets/pizzas.json';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {pizzasArr.map(({ id, title, price, imageUrl, sizes, types }) => (
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
        </div>
      </div>
    </div>
  );
}

export default App;
