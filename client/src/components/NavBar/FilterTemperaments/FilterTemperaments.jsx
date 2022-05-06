import React, { useState} from 'react';  
import { useSelector } from 'react-redux';
import styles from './FilterTemp.module.css';

function FilterTemperaments({setDogsTemperaments, setIni, setFin, setDispPrev, setDispNext}) {

  const temperaments = useSelector(state => state.temperaments);

  const [clear, setClear] = useState(true)

  const filterTemp=(e)=>{
    
    setDogsTemperaments(e.target.value)
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    setClear(false)
    
  }
  const clearTemp=(e)=>{
    e.preventDefault();
    setDogsTemperaments('')
    document.formul.select.value="";
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    setClear(true);
    
  }
  
  
  return (
    <form name='formul'>

      <label className={styles.title}>Temperament:</label>
      <select className={styles.input} name='select' defaultValue="" onChange={filterTemp}>
        <option value="" disabled> </option>
        {temperaments?.map(t => <option key={t.id} value={t.name} >{t.name}</option>)}
      </select>
      <button onClick={clearTemp} className={clear?styles.botonClear:styles.BtnClear}>Clear</button>
    </form>
    
  );
}
  
export default FilterTemperaments;