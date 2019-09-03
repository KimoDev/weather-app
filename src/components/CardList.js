import React from 'react';

import Card from './Card';

const CardList = (props) => {
    
    return props.days.map(day => {
        return day.map(d => {
            console.log(d);
            console.log(d.icon);
            const date = new Date(d.time * 1000);
            const day = date.toDateString().substring(0, 3)
            return <Card 
            day={day} 
            key={date.getDay()} 
            tempHigh={props.scale ? props.convertToC(d.temperatureHigh) : Math.round(d.temperatureHigh)} 
            tempLow={props.scale ? props.convertToC(d.temperatureLow) : Math.round(d.temperatureLow)} 
            icon={d.icon}
            />
        })
    })
}

export default CardList;