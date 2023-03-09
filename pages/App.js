import SearchBar from "./SearchBar";
import style from './style.module.css';
import Header from "./components/header";

const App = () => {
  return (
    <div className={style.header}>
        <Header />
        <SearchBar className={style.search}/>
    </div>
  );
}

export default App;