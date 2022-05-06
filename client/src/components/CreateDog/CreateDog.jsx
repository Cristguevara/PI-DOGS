import React, { useState, useEffect } from 'react';  
import { useSelector, useDispatch } from 'react-redux';
import {postDog} from '../../redux/actions/actions';
import { clearInfoPost } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import styles from './CreateDog.module.css';
import DogDetailComplete from '../DogCardComplete/DogCardComplete';



function CreateDog() {

  const [input, setInput] = useState({
    name:"", 
    heightMax:"",
    heightMin:"",
    weightMax:"",
    weightMin:"",
    lifeSpanMax:"",
    lifeSpanMin:"",
    image:"",
    temperament:[]
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const dogs = useSelector(state => state.dogs);
  const temperaments = useSelector(state => state.temperaments);

  useEffect(() => {
    return () => {
      dispatch(clearInfoPost())
    }
  },[dispatch])

  let dogsname=[]

  dogs.map(d => dogsname.push(d.name.toLowerCase()))

  function validate(input) {

    let errors = {};
    if (dogs.length===0){
      errors.name = "You have to watch the start first"
    } else if (!input.name) {
      errors.name = 'Name is required';
    } else if (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/.test(input.name)) {
      errors.name = 'The name must not contain numbers or special characters';
    } else if (dogsname.includes(input.name.toLowerCase())) {
      errors.name = 'Name already exists';
    }

    if (!input.heightMin || !input.heightMax) { 
      errors.height = 'The minimum and maximum heights are required';
    } else if (Number(input.heightMin)<=0 || Number(input.heightMax)<=0) {
      errors.height = 'Heights cannot be negative or null';
    }else if (/\D/.test(input.heightMin) || /\D/.test(input.heightMax)) {
      errors.height = "You broke the html but heights can't have letters";
    } else if (Number(input.heightMin)>=Number(input.heightMax)) {
      errors.height = 'The minimum height cannot be greater than or equal to the maximum height';
    } else if (Number(input.heightMin)>100 || Number(input.heightMax)>100) {
      errors.height = 'Heights must have consistent data';
    } 

    if (!input.weightMin || !input.weightMax) { 
      errors.weight = 'Minimum and maximum weights are required';
    } else if (Number(input.weightMin)<=0 || Number(input.weightMax)<=0) {
      errors.height = 'Weights cannot be negative or null';
    }else if (/\D/.test(input.weightMin) || /\D/.test(input.weightMax)) {
      errors.weight = "You broke the html but weights can't have letters";
    } else if (Number(input.weightMin)>=Number(input.weightMax)) {
      errors.weight = 'The minimum weight cannot be greater than or equal to the maximum weight';
    } else if (Number(input.weightMin)>100 || Number(input.weightMax)>200) {
      errors.weight = 'The weights must have consistent data';
    } 

    if (!input.lifeSpanMin || !input.lifeSpanMax) { 
      errors.lifeSpan = 'The minimum and maximum life expectancy are required';
    } else if (Number(input.lifeSpanMin)<=0 || Number(input.lifeSpanMax)<=0) {
      errors.height = 'Life expectancy cannot be negative or null';
    }else if (/\D/.test(input.lifeSpanMin) || /\D/.test(input.lifeSpanMax)) {
      errors.lifeSpan = "You broke the html but Life expectancy can't have letters";
    } else if (Number(input.lifeSpanMin)>=Number(input.lifeSpanMax)) {
      errors.lifeSpan = 'Minimum life expectancy cannot be greater than or equal to Maximum life expectancy';
    } else if (Number(input.lifeSpanMin)>20 || Number(input.lifeSpanMax)>20) {
      errors.lifeSpan = 'We all wish they lived longer, but unfortunately life expectancy has to be consistent';
    } 

    if (!input.image) {
      errors.image = 'Image is required';
    } 

    return errors;
  }

  const aggTemp = (e) => {
    if (!input.temperament.includes(e.target.value)){
    setInput({
      ...input, 
      temperament: [...input.temperament, e.target.value]})
    }
  }

  const handleInputChange = (e) =>{
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });

    let objError= validate({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(objError);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!Object.values(input).includes("") && Object.keys(errors).length===0){
      dispatch(postDog({
        ...input,
        name : input.name.charAt(0).toUpperCase()+input.name.slice(1)
      }))
      setInput({
        name:"", 
        heightMax:"",
        heightMin:"",
        weightMax:"",
        weightMin:"",
        lifeSpanMax:"",
        lifeSpanMin:"",
        image:"",
        temperament:[]
      })
      alert('perro creado');
    }else{
      alert("Completar todos los campos")
    }

  }
  const [searchTemp, setSearchTemp] = useState({
    inputTemp:""
  });
  const handleinputTemp = (e) =>{
    setSearchTemp({inputTemp:e.target.value})
  }
  let tempFind = temperaments.filter(t => t.name.toLowerCase().includes(searchTemp.inputTemp.toLowerCase()))
  
  const TempCreate = (e) =>{
    e.preventDefault();
    if(searchTemp.inputTemp.length<3){
      alert("Ingrese un temperamento válido")
    }else if (tempFind.length===0 && !input.temperament.includes(searchTemp.inputTemp.charAt(0).toUpperCase()+searchTemp.inputTemp.slice(1))){
      setInput({
        ...input, 
        temperament: [...input.temperament, searchTemp.inputTemp.charAt(0).toUpperCase()+searchTemp.inputTemp.slice(1)]
      })
      setSearchTemp({inputTemp:""})
    }else{
      alert("El temperamento ya existe")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div  className={styles.ContainerTop}>
            <Link to={`/Home`}>
            <button className={styles.BtnHome}>Home</button>
            </Link>
        </div>
        <div className={styles.ContainerformYcard}>
            <div className={styles.Containerform}>
            <div className={styles.textTitle}>Create dog</div>
            <div className={styles.subContainer}>
                <p className={styles.text}>Name*</p>
                <input className={styles.inputText} type={"text"} name={"name"} maxLength="40" 
                        onChange={handleInputChange} 
                        value={input.name} />
            </div>

            <div className={styles.subContainer}>
                <p className={styles.text}>Height in cm*</p>
                <div>
                <input className={styles.inputNum} type={"number"} name={"heightMin"} placeholder='Minimum' 
                        onChange={handleInputChange} 
                        value={input.heightMin} />

                <input className={styles.inputNum} type={"number"} name={"heightMax"} placeholder='Maximum' 
                        onChange={handleInputChange} 
                        value={input.heightMax} />
                </div>
            </div>

            <div className={styles.subContainer}>
                <p className={styles.text}>Weight in kg*</p>
                <div>
                <input className={styles.inputNum} type={"number"} name={"weightMin"} placeholder='Minimum' 
                        onChange={handleInputChange} 
                        value={input.weightMin} />

                <input  className={styles.inputNum} type={"number"} name={"weightMax"} placeholder='Maximum' 
                        onChange={handleInputChange} 
                        value={input.weightMax} />
                </div>
            </div>

            <div className={styles.subContainer}>
                <p className={styles.text}>Life span in years*</p>
                <div>
                <input  className={styles.inputNum} type={"number"} name={"lifeSpanMin"} placeholder='Minimum' 
                        onChange={handleInputChange} 
                        value={input.lifeSpanMin} />

                <input  className={styles.inputNum} type={"number"} name={"lifeSpanMax"} placeholder='Maximum' 
                        onChange={handleInputChange} 
                        value={input.lifeSpanMax} />
                </div>
            </div>

            <div className={styles.subContainerTemp}>
            <label className={styles.textTemp}>Temperament:</label>
            <select name='select' defaultValue="" onChange={aggTemp}>
              <option value="" disabled>Add</option>
              {temperaments?.map(t => <option key={t.id} value={t.name} >{t.name}</option>)}
            </select>
            </div>

            <div className={styles.subContainer}>
            <p className={styles.text}>Create temperament:</p>
              <div>
              <input className={styles.inputText}
                type={"text"} 
                name={"TempCreate"}  
                value={searchTemp.inputTemp}
                onChange={handleinputTemp}
              />
              </div>
              <button className={styles.btnTemp} onClick={TempCreate}>Create</button>
            </div>

            <div className={styles.subContainer}>
                <p className={styles.text}>URL image*</p>
                <input  className={styles.inputText} type={"text"} name={"image"} 
                        onChange={handleInputChange} 
                        value={input.image} />
            </div>
            <div>{Boolean(Object.values(errors).length) && (<p className="danger">{Object.values(errors)[0]}</p>)}</div>
            <div>
            <button className={styles.btnCreate} type="submit">Create breed</button>
            </div>
            </div>
            <DogDetailComplete name={input.name.charAt(0).toUpperCase()+input.name.slice(1)} image={input.image} height={`${input.heightMin} - ${input.heightMax} `} weight={`${input.weightMin} - ${input.weightMax} `}
                              temperament={input.temperament.join(', ')} life_span={`${input.lifeSpanMin} - ${input.lifeSpanMax} years`}/>
        </div>
      <div  className={styles.ContainerBottom}>
      </div>
    </form>
  );
}
  
export default CreateDog;