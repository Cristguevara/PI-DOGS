import React, {useEffect} from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getDogDetail, clearDetail} from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import imageperrito from '../images/perrito-animate.gif';
import DogDetailComplete from '../DogCardComplete/DogCardComplete';
import styles from './DogDetail.module.css';

function DogDetail() {

  const {id} =useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDogDetail(id))

    return () => {
      dispatch(clearDetail())
    }

  },[dispatch, id])

  const dogDetail = useSelector(state => state.dogDetail)

  if(dogDetail.length===0){
    return (
    <div>
      <div  className={styles.ContainerTop}>
      <Link to={`/Home`}>
      <button className={styles.BtnHome}>Home</button>
      </Link>
      </div>
      <img  src={imageperrito} alt='img not found' />
      <div  className={styles.ContainerBottom}>
      </div>
    </div>
    )
  }else if(dogDetail==="El id de la raza de perro no existe"){
    return <h1>Invalid login...</h1>
  }else{
    return (
      <div >
          <div  className={styles.ContainerTop}>
            <Link to={`/Home`}>
            <button className={styles.BtnHome}>Home</button>
            </Link>
          </div>
          <DogDetailComplete name={dogDetail[0].name} image={dogDetail[0].image} height={dogDetail[0].height} weight={dogDetail[0].weight}
                             temperament={dogDetail[0].temperament} life_span={dogDetail[0].life_span}/>
          <div  className={styles.ContainerBottom}>
          </div>
      </div>
    );
  }
}
  
export default DogDetail;