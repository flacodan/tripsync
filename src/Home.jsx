import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Home() {
    // const MyComponent = () => {
    //     const { id } = useParams();
    //     // The `id` parameter will be the value of the `:id` parameter in the route path.
    //     return <div>{id}</div>;
    //   };
    const [isCreated, setIsCreated] = useState(false);
    const [tripName, setTripName] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [tripCode, setTripCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [tripComplete, setTripComplete] = useState(false);
    
    const map = useRef(null);
    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHJpcHN5bmMiLCJhIjoiY2xzdGloMGMwMWJtcjJpczNjdmx5ZmY2cyJ9.cjfI8_qhTfgfJty0E-iGGA';
        
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 1 // starting zoom
            
        });
        
    }, []);
    
    
    const handleSubmit = async (e) => {
        const randomCode = uuidv4().slice(0, 6).toUpperCase();
        setTripCode(randomCode)
        setIsCreated(true)
        e.preventDefault();
        console.log('tripDate' + tripDate )
        console.log('submitted trip');
        let tripBod = {
            trip_name: tripName,
            trip_start: tripDate,
            trip_complete: tripComplete,
            trip_code: randomCode
        }
        axios.post('/api/trips', tripBod)
        .then((response) => {
            console.log(response.data);
        })
        console.log('submitted');

    }

    const handleJBC = async () => {
        console.log(joinCode);
        const response = await axios.post(`/api/addUserToTrip/${joinCode}`).then((response) => {
        // const trip_id = response.data;

        console.log('joined trip ' + response.data);
    })
    }


        
    return (
        <div className='home-container'>
            <h2>Welcome username!</h2>
            <section className='map-section'>
                
                    <div id='map'>
                       
                    </div>    
               
            </section>
            <h1>----------------------------------------------</h1>
            <section className='create-trip-section'>
            {!isCreated ? (
                <div className='create-trip-container'>
                    <h2>Create a Trip</h2>
                    <label for="tripName">Name your trip:</label>
                    <input id="tripName" type="text" onChange={(e) => setTripName(e.target.value)}/>
                    <label for="tripDate">Date:</label>
                    <input id="tripDate" type="date" onChange={(e) => setTripDate(e.target.value)} />
                    <button onClick={handleSubmit}>Create</button>
                </div>
            ) : (
    
                <div className='createD-trip-container'>
                    <h2>Trip Successfully Created!</h2>
                    <h4>You can locate this trip in the trips tab above!</h4>
                    <h3>Group members can join using this code:</h3>
                    <h2>{tripCode}</h2>
                </div>
            )}
            </section>
            <h1>----------------------------------------------</h1>

            <section>
                <div>
                    <h2>Join by code</h2>
                    <label for="inviteCode" >enter your invite code here:</label>
                    <input value={joinCode} id="inviteCode" type="text" onChange={(e) => setJoinCode(e.target.value)}/>
                    <button onClick={handleJBC}>Join Trip</button> 
                    {/* <p>{tripCodeJoin}</p> */}
                </div>
            </section>
        </div>
    )
}

export default Home;