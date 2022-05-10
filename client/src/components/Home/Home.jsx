import React, {useEffect, useState} from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import {getAllDogs, getDogTemperaments} from '../../redux/actions/actions';
import DogCard from '../DogCard/DogCard.jsx';
import NavBar from '../NavBar/NavBar';
import styles from './Home.module.css';
import imageperrito from '../images/perrito-animate.gif';




function Home() {

  const dispatch = useDispatch();

  const dogs = useSelector(state => state.dogs);  
  
  useEffect(() =>{
    dispatch(getAllDogs(""))
    dispatch(getDogTemperaments())
  },[dispatch])  

  const [dogsTemperaments, setDogsTemperaments] = useState('')
  const [dogName, setDogName] = useState('')
  const [order, setOrder] = useState('')

  let dogsFilter=dogs
  if(dogsTemperaments!==''){
    dogsFilter=dogsFilter.filter(dog => dog.temperament?.includes(dogsTemperaments));
  }

  if(dogName!==''){
    dogsFilter=dogsFilter.filter(dog => dog.name===dogName);
  }
  let dogsErrors=[]
  let dogsWithoutErrors=[]
  if(order==='nameAsc'){
    dogsFilter.sort((a,b)=>(a.name>b.name)?1:-1)
  }else if(order==='nameDes'){
    dogsFilter.sort((a,b)=>(a.name>b.name)?-1:1)
  }else if(order==='weightAsc'){
    dogsWithoutErrors=dogsFilter.filter(dog => dog.weight.length>2)
    dogsWithoutErrors=dogsWithoutErrors.filter(dog => !dog.weight.includes('NaN'))
    dogsErrors=dogsFilter.filter(dog => dog.weight.length<=2||dog.weight.includes('NaN'))
    dogsFilter=dogsWithoutErrors.sort((a,b)=>(a.weight?.split(' - ')[0]-b.weight?.split(' - ')[0])).concat(dogsErrors)
  }else if(order==='weightDes'){
    dogsWithoutErrors=dogsFilter.filter(dog => dog.weight.length>2)
    dogsWithoutErrors=dogsWithoutErrors.filter(dog => !dog.weight.includes('NaN'))
    dogsErrors=dogsFilter.filter(dog => dog.weight.length<=2||dog.weight.includes('NaN'))
    dogsFilter=dogsWithoutErrors.sort((a,b)=>(a.weight?.split(' - ')[0]-b.weight?.split(' - ')[0])).reverse().concat(dogsErrors)
  }

  let dogsFind=[]
  if(dogs.length===0){
    dogsFind=<img  src={imageperrito} alt='img not found' />
  }else if(dogs==='No coincide con ningúna'){
    dogsFind=<div>
              <h1>No results found</h1>
              </div>
  } else if(dogsFilter.length===0){
    dogsFind=<div>
              <h1>No results found</h1>
              </div>
  }
  else{
    dogsFind=dogsFilter?.map(d => {
      return <DogCard 
              id={d.id}
              key={d.id} 
              image={d.image} 
              name={d.name} 
              temperament={d.temperament}
              weight={d.weight}  
              />
    })
  }

  let dogsForPage = []

  let [ini, setIni] = useState(0)
  let [fin, setFin] = useState(8)
  
  if(dogsFind.length && dogsFind.length>8){
    dogsForPage=dogsFind.slice(ini,fin)
  }else{
    dogsForPage=dogsFind
  }

  let [disPrev, setDispPrev] = useState(true)
  let [disNext, setDispNext] = useState(false)
  let disText = false

  if(dogs.length===0){
    disNext=true
    disText=true
  }
  if(dogsFind.length===undefined){
    disNext=true
    disText=true
  }

  if(dogsFind.length<=8){
    disPrev=true
    disNext=true
  }

  const Next =function(){
    if(ini===0){setDispPrev(false)}

    if(fin<dogsFind.length){
      setIni(ini+8)
      setFin(fin+8)
    }
    if(dogsFind.length-fin<=8){
      setDispNext(true)
    }
    
  }
  
  function Prev(){
    if(ini>0){
      setIni(ini-8)
      setFin(fin-8)
    }
    if(ini===8){
      setDispPrev(true)
    }
    
    if(dogsFind.length-fin<=8){
      setDispNext(false)
    }
  }
  let Pages=0
  
  if(dogsFind.length===8){
    Pages=1
  }else{
    Pages=Math.floor(dogsFind.length/8)+1
  }
  
  return (
    <div>
      <div>
      <NavBar setIni={setIni} setFin={setFin} setDispPrev={setDispPrev} setDispNext={setDispNext} setDogsTemperaments={setDogsTemperaments} setDogName={setDogName} setOrder={setOrder}/>
      </div>
      <div className={styles.Cards}>
      { 
        dogsForPage
      }
      </div>
      <div className={styles.paginationContainer}>
      <button className={disPrev?styles.boton:styles.botonON} onClick={()=>Prev()} >Prev</button>
      <label className={disText?styles.textPagination:styles.textPaginationON}>Page {fin/8} of {Pages}</label>
      <button className={disNext?styles.boton:styles.botonON} onClick={()=>Next()} >Next</button>
      </div>
    </div>
  );
  


}
  
export default Home;