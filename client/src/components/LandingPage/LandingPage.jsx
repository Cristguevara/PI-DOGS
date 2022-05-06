import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import PIDogs from '../images/PIDogs.png';
import WaitingDog from '../images/WaitingDog.gif';


const LandingPage = () => {

    return (
      <div className={styles.boxfather}>
        <div className={styles.boxChild1}>
          <div>
            <img className={styles.PIimage} src={PIDogs} alt='img not found'/>
          </div>
          <div>
            <Link to='/Home'>
            <button className={styles.bottomLanding}>Get into</button>
            </Link>
          </div>
        </div>
        <div className={styles.boxChild2}>
        <img className={styles.WaitImage} src={WaitingDog} alt='img not found'/>
        </div>
      </div>
    );
  };
  
export default LandingPage;