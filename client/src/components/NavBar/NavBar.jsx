import React from 'react';  
import SearchBar from '../SearchBar/SearchBar';
import FilterTemperaments from './FilterTemperaments/FilterTemperaments.jsx';
import ChooseBreed from './ChooseBreed/ChooseBreed.jsx';
import Order from './Order/Order.jsx';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar({ setIni, setFin, setDispPrev, setDispNext, setDogsTemperaments, setDogName, setOrder}) {

  return (
    <div className={styles.NavBar}>

      <div className={styles.filterContainer}>
        <h3 className={styles.filtertext}>Filter by</h3>
        <div className={styles.filters}>
        <div>
          <ChooseBreed setDogName={setDogName}  setIni={setIni} setFin={setFin} setDispPrev={setDispPrev} setDispNext={setDispNext}/>
        </div>
        <div>
          <FilterTemperaments setDogsTemperaments={setDogsTemperaments}  setIni={setIni} setFin={setFin} setDispPrev={setDispPrev} setDispNext={setDispNext}/>
        </div>
        </div>
      </div>

      <div className={styles.containerSearchBar}>
        <SearchBar  setIni={setIni} setFin={setFin} setDispPrev={setDispPrev} setDispNext={setDispNext}/>
      </div>

      <div className={styles.filterContainer}>
       <h3 className={styles.filtertext} >Order by</h3>
        <Order setOrder={setOrder}  setIni={setIni} setFin={setFin} setDispPrev={setDispPrev} setDispNext={setDispNext}/>
      </div>

      <div className={styles.btnContainer}>
        <Link to='/CreateDog'>
          <button className={styles.btnCreate}>Create dog</button>
        </Link> 
      </div>
    </div>

  );
}
  
export default NavBar;