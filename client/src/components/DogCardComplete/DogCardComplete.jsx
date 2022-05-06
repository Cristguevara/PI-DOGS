import React from 'react'; 
import styles from './DogCardComplete.module.css';
import iconsTemp from '../images/Temperament.png';
import iconsHeight from '../images/Altura.png';
import iconsPeso from '../images/Peso.png';
import iconsLife from '../images/Vida.png';
import imageNotFound from '../images/ImageNotFound.png';

function DogDetailComplete({name,image, height, weight, temperament, life_span}) {
    return (
        <div className={styles.container}>
            <div className={styles.DogCard}>
              <div className={styles.containImage} >
              <img className={styles.image} src={image?image:imageNotFound} alt='Img Not Found' />
              </div >
              <h4 className={styles.nametext}>{name}</h4>

              <div className={styles.containerInfo}> 
                <div className={styles.containerIconText}>
                  <div className={styles.containerIcon}>
                  <img className={styles.icon} src={iconsHeight} alt='img not found' />
                  </div>
                  <p className={styles.textInfo}>height: {height} cm</p>
                </div >
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
                <div className={styles.containerIconText}>
                  <div className={styles.containerIcon}>
                  <img className={styles.icon} src={iconsLife} alt='img not found' />
                  </div>
                  <p className={styles.textInfo}>Life span: {life_span} </p>
                </div>
              </div>
            </div>
          </div>
    );
}
export default DogDetailComplete;