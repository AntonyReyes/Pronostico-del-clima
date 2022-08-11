import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import IsLoading from './IsLoading'

const CardWeather = ({ lat, lon }) => {


    const [weather, setWeather] = useState()

    const [temperature, setTemperature] = useState()

    const [isCelsius, setIsCelsius] = useState(true)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (lat) {
            const APIkey = '1c1e57bb5b4af452ef46d59fdea24cd5'

            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${(res?.data.main.temp - 273.15).toFixed(2)} °C`,
                        farenheit: `${((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)} °F`
                    }
                    setTemperature(temp)
                    setIsLoading(false)
                })
                .catch(err => console.log(err))
        }

    }, [lat, lon])

    console.log(weather);

    const handleClick = () => {
        setIsCelsius(!isCelsius)
    }

    if (isLoading) {
        return <IsLoading />
    } else {

        return (
            <article className='container__main'>
                <div className="container__1">

                    <div className="card__title">
                        <h1>Weather App</h1>
                        <h3>{`${weather?.name}, ${weather?.sys.country}`}</h3>
                    </div>

                    <div className="container__2">
                        <div>
                            <img className='card__img' src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                        </div>

                        <div className='card__ligth__rain'>
                            <h3><span>&#34;{` ${weather?.weather[0].description}`} &#34;</span></h3>
                            <ul>
                                <li><span>Mind Speed: </span>{weather?.wind.speed}  m/s</li>
                                <li><span>Cluods: </span>{weather?.clouds.all} %</li>
                                <li><span>Pressure: </span>{weather?.main.pressure} hPa </li>
                            </ul>
                        </div>
                    </div>


                    <div className="temperature">
                        <h3>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h3>
                    </div>

                    <div className='container__button'>
                        <button onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
                    </div>

                </div>
            </article>
        )
    }

}

export default CardWeather