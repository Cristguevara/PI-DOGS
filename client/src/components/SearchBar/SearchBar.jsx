import React,{useState} from 'react'; 
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux'; 
import {getAllDogs, clearAllDogs} from '../../redux/actions/actions';


function SearchBar({ setIni, setFin, setDispPrev, setDispNext}) {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [BtnClear, setBtnClear] = useState(true);
  const [searchFind, setSearchFind] = useState('');
  const [BtnSearchFind, setBtnSearchFind] = useState(true);
  
  const handleSearch=()=>{
     dispatch(clearAllDogs());
     setIni(0);
     setFin(8);
     setDispPrev(true);
     setDispNext(false);
     dispatch(getAllDogs(search));
     setSearchFind(search);
     setSearch('');
     setBtnClear(true);
     setBtnSearchFind(false);
  }
  const handleClear=()=>{
    setSearch('');
    setBtnClear(true);
 }
 const handleSearchFind=()=>{
  setSearchFind('');
  setBtnSearchFind(true);
  dispatch(clearAllDogs());
  dispatch(getAllDogs(''));
}
  return (
    <div>
    <div className={styles.searchBarContaner}>
      <input className={styles.searchBar}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => {setSearch(e.target.value);setBtnClear(false)}}
      />
      <button className={BtnClear?styles.btnClearHidden:styles.btnClear} onClick={handleClear}>X</button>
      <button className={styles.btnSearch} onClick={handleSearch}>Search</button>
    </div>
    <div className={styles.searchFindContaner}>
    <h3 className={styles.searchFindText}>{searchFind}</h3>
    <button className={BtnSearchFind?styles.btnSearchFindHidden:styles.btnSearchFind} onClick={handleSearchFind}>Clear</button>
    </div>
    </div>
  );
}
  
export default SearchBar;