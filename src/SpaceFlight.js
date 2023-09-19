import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './SpaceFlight.css'

function SpaceFlight() {
  const [flights, setFlights] = useState([])

  //Get the flights data from SpaceX API endpoint: 'https://api.spacexdata.com/v2/launches'
  useEffect((() => {
    axios
    .get('https://api.spacexdata.com/v2/launches') //Sending a request to get data from spacex api endpoint
    .then((res) => {
      setFlights(res.data)
    }) // Getting a response
    .catch((err) => {
      console.log('There was an error in fetching spacex api data: ', err)
    })
  }), []) //Catching any errors in case there are any

  return (
    <ul className='flights-list'>
        {flights.map((flight) => 
            <li key={flight.flight_number}>
                <div className='flight-info'>
                    <img src={flight.links.mission_patch_small}  alt={flight.mission_name}/>

                    <div className='flight-data'>
                        <h2> { flight.mission_name } </h2>
                        <p>Flight Number: {flight.flight_number}</p>
                        <p>Launch Year: {flight.launch_year}</p>
                        <p>Launch Date/Time: {flight.launch_date_utc}</p>
                        <a href={flight.links.article_link}>Read about the launch</a>
                    </div>
                </div>
            </li>
        )}
    </ul> 
  ) // Renders or displays the data we requested for
}

export default SpaceFlight;
