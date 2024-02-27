import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import NavBar from './Navbar';
import './Home.css'

function Home() {

    const location = useLocation();
    //can only use this when arriving from signin page:
    //const { userObj } = location.state;
    //userObj= {"user":{"user_id":1,"username":"user0@test.com","password":"test"},"success":true}

    const [isCreated, setIsCreated] = useState(false);
    const [tripName, setTripName] = useState('');
    const [tripDate, setTripDate] = useState(null);
    const [tripCode, setTripCode] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [tripComplete, setTripComplete] = useState(false);
    
    const map = useRef(null);
    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHJpcHN5bmMiLCJhIjoiY2xzdGloMGMwMWJtcjJpczNjdmx5ZmY2cyJ9.cjfI8_qhTfgfJty0E-iGGA'; //Don't forget to cancel your mapbox account
        
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
        // e.preventDefault();
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
        // refresh navbar? show success message???????????????????????????????????????????????????????????
            console.log("Home.handlesubmit " + JSON.stringify(response.data));
        })
        console.log('submitted');

    }

    const handleJBC = async () => {
        const response = await axios.post(`/api/addUserToTrip/${joinCode}`).then((response) => {
        // refresh navbar? show success message???????????????????????????????????????????????????????????
        console.log('joined trip ' + response.data);
    })
    }


        
    return (
        <>
        <NavBar/>
        <div className='home-container'>
                {/* <section className="balloon-home1">
                <img className='balloon-img-home1' src="../public/appImages/balloon.png" alt="birds" />
                </section> */}
            <div className='home-forms-container'>
                {/* <h2>Welcome username!</h2> */}
                <section className='map-section'>
            <div id='map'>   
                    </div>
            </section>
            <section className='create-trip-section'>
                {!isCreated ? (
                    <div className='create-trip-container'>
                        <h2>Create a Trip</h2>
                        <label htmlFor="tripName">Name your trip:</label>
                        <input id="tripName" type="text" onChange={(e) => setTripName(e.target.value)}/>
                        <label htmlFor="tripDate">Date:</label>
                        <input id="tripDate" type="date" onChange={(e) => setTripDate(e.target.value)} />
                        <button onClick={handleSubmit}>Create</button>
                    </div>
            ) : (
                <div className="modal-wrapper">
                    <div className="modal-box">
                        <h2>Trip Successfully Created!</h2>
                        <h4>You can locate this trip in the trips tab above!</h4>
                        <h3>Group members can join using this code:</h3>
                        <h2>{tripCode}</h2> 
                        <button className="x" onClick={() => window.location.reload()}>X</button>
                         {/* <div className="modal-background1"></div> */}
                    </div>
                </div>
            )}
            </section>
             <section className='join-by-code-section'>
                    <div className='join-by-code-container'>
                        <h2>Join by code</h2>
                        <label htmlFor="inviteCode" >enter your invite code here:</label>
                        <input value={joinCode} id="inviteCode" type="text" onChange={(e) => setJoinCode(e.target.value)}/>
                        <button onClick={handleJBC}>Join Trip</button> 
                        {/* <p>{tripCodeJoin}</p> */}
                    </div>
                </section>
            </div>
        </div>
    </>
    )
}

export default Home;