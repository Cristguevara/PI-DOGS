import React  from 'react';  

import styles from './Order.module.css';

function Order({ setOrder, setIni, setFin, setDispPrev, setDispNext}) {

  
  const nameAsc=()=>{
    setOrder('nameAsc')
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    
  }
  const nameDes=()=>{
    setOrder('nameDes')
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    
  }
  const weightAsc=()=>{
    setOrder('weightAsc')
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    
  }
  const weightDes=()=>{
    setOrder('weightDes')
    setIni(0);
    setFin(8);
    setDispPrev(true);
    setDispNext(false);
    
  }
  
  
  return (
    <div className={styles.filters}>

      <div>
        <label className={styles.title}>Name:</label>
        <button className={styles.BtnOrder} onClick={nameAsc} >ASC</button>
        <button className={styles.BtnOrder} onClick={nameDes} >DES</button>
      </div>

      <div>
        <label className={styles.title}>Weight:</label>
        <button className={styles.BtnOrder} onClick={weightAsc} >ASC</button>
        <button className={styles.BtnOrder} onClick={weightDes} >DES</button>
      </div>

    </div>
    
  );
}
  
export default Order;