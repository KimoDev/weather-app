import React from 'react';
import '../style.css';

import styles from '../style.module.css';
import '../style.css';
import SVG from './SVG'



const Card = (props) => (
    <div className={styles.cards} onClick={props.onClick(props)}>
        <div className={styles.cardContent}>
            <div>{props.day}</div>
            <div> 
                <SVG name={"test"} size={50} icon={props.icon} />
            </div>
            <div>
                {props.tempHigh}º {props.tempLow}º 
                
            </div>
        </div>
     </div>
)

export default Card;