import React from 'react';

import Card from './Card';

const CardList = (props) => {
    
    return props.days.map(day => {
        
        // i called it OG because i spent hours trying to figure out a bug.. this OG fixed it
        const OG = day;
        return day.map(d => {
            
            const date = new Date(d.time * 1000);
            const day = date.toDateString().substring(0, 3)
            return <Card 
            day={day} 
            id={date.getDay()}
            key={date.getDay()} 
            tempHigh={props.scale ? props.convertToC(OG[date.getDay()].temperatureHigh) : Math.round(OG[date.getDay()].temperatureHigh)} 
            tempLow={props.scale ? props.convertToC(OG[date.getDay()].temperatureLow) : Math.round(OG[date.getDay()].temperatureLow)} 
            icon={OG[date.getDay()].icon}
            onClick={props.cardClick}
            />
        })
    })
}

export default CardList;