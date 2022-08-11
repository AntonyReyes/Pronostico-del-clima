import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './assets/components/CardWeather'
import IsLoading from './assets/components/IsLoading'

function App() {


  const [coords, setCoords] = useState()


  useEffect(() => {
    const succces = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }
    navigator.geolocation.getCurrentPosition(succces)
  }, [])


  return (
    <div className="App">
      
      <CardWeather  lat={coords?.lat} lon={coords?.lon} />

    </div>
  )
}

export default App
