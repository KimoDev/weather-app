import React, { Component } from 'react';
import axios from 'axios';

import '../style.css';
import styles from '../style.module.css';


import Header from './Header';
import SearchBar from './SearchBar'
import WeatherDetails from './WeatherDetails';
import Footer from './Footer';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            dailyForecast: [],
            currentForecast: {},
            isCelsiusActive: true
        }
    }
    
     componentDidMount = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.getInitalLocation, (err) => console.log(err),{timeout:10000});
            }  
    }
   
    handleSubmit = async (e) => {
        e.preventDefault();
        
        const location = e.currentTarget.children[0].value;
        const data = await this.getSearchedLocation(location);
        console.log(data.forecast);
        this.setState({
            location: data.address,
            currentForecast: data.forecast.currently,
            dailyForecast: [data.forecast.daily.data.slice(0, 7)]
        }, () => {
            
        });
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        }, () => {
            
        });
    }
    // No fahrenheit because data is by default in fahrenheit
    convertToCelsius = (fahrenheitValue) => {
        //(32°F − 32) × 5/9
        return Math.round((fahrenheitValue - 32) * 0.55555555555);
    }

    handleTemperatureSwitch = (e) => {
        if (!this.state.isCelsiusActive && e.target.innerText === "ºC") {
            
            this.setState(state => ({
                isCelsiusActive: !state.isCelsiusActive,
                
            }))
            
        }
        if (this.state.isCelsiusActive && e.target.innerText === "ºF") {
            this.setState(state => ({
                isCelsiusActive: !state.isCelsiusActive
            }))
        } 
    }

    getInitalLocation = async (position) => {
        const {latitude, longitude} = position.coords;

        const res = await axios.post(`http://localhost:8080/`, {
                location : {
                    lat : latitude, 
                    lng: longitude
                }
            });
        this.setState(() => ({
            location: res.data.address.results[0].formatted_address,
            currentForecast: res.data.forecast.currently,
            dailyForecast: [res.data.forecast.daily.data.slice(0, 7)]
        }), () => {
           
        });
}

    getSearchedLocation =  async (location) => {
        
        const response = await axios.post(`http://localhost:8080/geo`, {location});
        
        return response.data;
    }
    
    render() {
        
        return (
            <div className={styles.test}>
                <Header/>  
                <div className={styles.mainWrapper}>
                    <SearchBar onSubmit={this.handleSubmit} value={this.state.input} onChange={this.handleChange}/>
                    <WeatherDetails 
                    days={this.state.dailyForecast} 
                    tempSwitch={this.handleTemperatureSwitch} 
                    scale={this.state.isCelsiusActive}
                    temp={this.state.isCelsiusActive ? this.convertToCelsius(this.state.currentForecast.temperature) : Math.round(this.state.currentForecast.temperature)}
                    apparentTemp={this.state.isCelsiusActive ? this.convertToCelsius(this.state.currentForecast.apparentTemperature) : Math.round(this.state.currentForecast.temperature)}
                    summary={this.state.currentForecast.summary}
                    address={this.state.location || null} 
                    convertToC={this.convertToCelsius}
                    icon={this.state.currentForecast.icon}
                    /> 
                    <Footer />   
                </div>
                
            </div>
        )
    }
}

export default App;