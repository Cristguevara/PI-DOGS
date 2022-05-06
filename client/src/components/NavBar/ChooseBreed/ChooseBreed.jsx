import React, { useState} from 'react';  
import { useSelector } from 'react-redux';
import styles from './ChooseBreed.module.css';

function ChooseBreed({ setDogName, setIni, setFin, setDispPrev, setDispNext}) {

  const dogs = useSelector(state => state.dogs);

  const [clearBreed, setClearBreed] = useState(true)

  const filterTemp=(e)=>{
    
    setDogName(e.target.value)
    setClearBreed(false)
    
  }
  const clearTemp=(e)=>{
    e.preventDefault();
    setDogName('')
    document.formul2.select2.value="";
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    setClearBreed(true);
    
  }
  
  let dogsFind=[]
  if(dogs!=='No coincide con ningúna'){
    dogsFind=dogs?.map(d => <option key={d.id} value={d.name} >{d.name}</option>)
  }
  return (
    <form name='formul2'>

      <label className={styles.title}>Breed:</label>
      <select className={styles.input} name='select2' defaultValue="" onChange={filterTemp}>
        <option value="" disabled></option>
        {dogsFind}
      </select>
      <button onClick={clearTemp} className={clearBreed?styles.botonClear:styles.BtnClear}>Clear</button>
    </form>
    
  );
}
  
export default ChooseBreed;