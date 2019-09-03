import React from 'react';

import CardList from './CardList';
import styles from '../style.module.css';

import SVG from './SVG'
const WeatherDetails = (props) => {
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return (

        <div className={styles.WeatherDetailsWrapper}>
            <div className={styles.weatherTitle}>
                <div className={styles.row}>
                <span className={styles.date}>{week[new Date().getDay()]} {new Date().getHours()}:00</span> 
                <span className={styles.dayType}>{props.summary}</span>
                </div>
                <div className={styles.row}>{props.address}</div>
            </div>
            <div className={styles.weatherContent}>
                <div className={styles.iconHolder}>
                    {props.icon ? <SVG icon={props.icon} size={150} /> : null}
                </div>
                
                    
                    <div className={styles.tempDetails}>
                    <h1 className={styles.temperatureLabel}>{props.temp || null}</h1>
                        <div className={styles.tempSwitchWrapper}>
                        <div className={`${styles.tempSwitch}`}>
                            <p className={styles.tempBtn}>
                            
                            <span className={props.scale ? styles.activeScale : styles.notActiveScale} onClick={props.tempSwitch}>ºC</span>

                            <span className={styles.seperator}>| </span>

                            <span className={!props.scale ? styles.activeScale : styles.notActiveScale} onClick={props.tempSwitch}>ºF</span>

                            </p>
                        </div>
                        <div className={styles.extraText}>
                            <p> Feels like {props.apparentTemp || null}º </p>
                        </div>
                        </div>
                        
                    </div>
                
            </div>
            <div className={styles.cardListWrapper}>
                <CardList days={props.days} convertToC={props.convertToC} scale={props.scale}/>
            </div>
        </div>

    )
}

export default WeatherDetails;