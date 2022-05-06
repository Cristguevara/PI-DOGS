import React from 'react';  
import styles from './DogCard.module.css';
import { Link } from 'react-router-dom';
import iconsPeso from '../images/Peso.png';
import iconsTemp from '../images/Temperament.png';
import imageNotFound from '../images/ImageNotFound.png';


function DogCard({image, name, temperament, weight, id}) {

  return (
    
      <div className={styles.container}>
        <div className={styles.DogCard}>
          <div className={styles.containImage} >
          <img  className={styles.image} src={image?image:imageNotFound} alt='img not found' />
          </div>
          <h4 className={styles.nametext}>{name}</h4>
          <div className={styles.containerInfo}>
            <div className={styles.containerIconText}>
                  <div className={styles.containerIcon}>
                  <img className={styles.icon} src={iconsPeso} alt='img not found' />
                  </div>
                  <p className={styles.textInfo}>Weight: {weight} kg</p>
                </div>
            <div className={styles.containerIconText}>
              <div className={styles.containerIcon}>
              <img className={styles.icon} src={iconsTemp} alt='img not found' />
              </div>
              <p className={styles.textInfo}>{temperament}</p>
            </div>

          </div>
          <Link to={`/DogDetail/${id}`} className={styles.link}>
          <button className={styles.btnDetails}>Details</button>
          </Link>
        </div>
      </div>
  );
}
  
export default DogCard;