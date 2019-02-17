import React, { Component } from 'react';
import Button from './Button';
import axios from "axios";
import './Text.css';

class Text extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentTemp: null,
            currentHumidity: null,
            cityName: '',
            inputName: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }

    setInitialState(){
        if(this.getCache())
        {
            const res = JSON.parse(this.getCache());
            this.setTemperatureDetails(res.currentTemp,res.currentHumidity,res.cityName);
        }
        else
            this.setTemperatureDetails(null,null,'');

    }

    setTemperatureDetails(temp,humidity,cityName){
        this.setState({
            currentTemp: Math.trunc(temp),
            currentHumidity: humidity,
            cityName: cityName
        })
    }

    setCache(currentTemp,currentHumidity,cityName){
        let tempData = {
            currentTemp: currentTemp,
            currentHumidity: currentHumidity,
            cityName: cityName
        };
        localStorage.setItem('lastTemp',JSON.stringify(tempData));
    }

    getCache(){
        return localStorage.getItem('lastTemp');
    }

    //testMethod
    clearCache(){
        localStorage.clear();
    }

    async getWeatherInformation(cityName) {
        return await axios.get('http://api.openweathermap.org/data/2.5/weather?q='+cityName+',usa&units=metric&APPID=611b58a3a51d9a5d782a5bee5fefe4ab');
    }

    async handleClick(){
        //event.preventDefault();
        const result = await this.getWeatherInformation(this.state.inputName);
        console.log(result.data);
        this.setTemperatureDetails(result.data.main.temp,result.data.main.temp,this.state.inputName);
        this.setCache(this.state.currentTemp,this.state.currentHumidity,this.state.cityName);
    }

    handleInput(event){
        this.setState({
            inputName: event.target.value
        })
    }

    componentDidMount() {
        this.setInitialState();
    }

    render() {
        return(
            <div className="Align">
                <h1 className="Heading-Font">Weather Data</h1>
                <p className="Para-Font">Current Temperature: {this.state.currentTemp} C</p>
                <p className="Para-Font">Current Humidity: {this.state.currentHumidity} %</p>
                <p className="Para-Font">City location: {this.state.cityName}</p>
                <br/>
                <p className="Para-Font">Update Location Name</p>
                <input  className="InputBox" type="text" value={this.state.inputName} onChange={this.handleInput}/>
                <Button name='Set Location' onClick={this.handleClick}/>
            </div>
        );
    }
}

export default Text;