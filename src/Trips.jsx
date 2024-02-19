import './Trips.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trips(){

    const [trip, setTrip] = useState([]);
    const { trip_id } = useParams(null);
    console.log("Trips.trip_id: " + trip_id);

    useEffect(() => {
        const fetchTrip = async () => {
            if(trip_id){
                try {
                    const response = await axios.post('/api/getTrip', {trip_id: trip_id});
                    console.log(JSON.stringify(response.data));
                    setTrip(response.data[0]);
                } catch (error) {
                    console.error('Error getting trip: ');
                };
            } else { console.log("No trip id"); };
        };
        fetchTrip();
    }, [trip_id]);

    return (
        <>
            <div className="trip-name">{trip.trip_name}</div>
            <div className="trip-lists">
                <div className="trip-list">
                    <div className="header-container1">
                        <div className="todo2">To-Do</div>
                        <div className="owner">Owner</div>
                    </div>
                    <div className='table-container1'>
                        <div className="row-container1">
                            <button className="YN">X</button>
                            <div className=''>To-Do here</div>
                            <div className="">Owner here</div>
                        </div>
                    </div>
                        <button className="to-do-btn">Add To-Do</button>
                </div>
                <div className="trip-list">
                    <div className="header-container2">
                        <div className="pin">Pin</div>
                        <div className="place">Place</div>
                    </div>
                    <div className='table-container2'>
                        <div className="row-container2">
                            <div className=''>Pin here</div>
                            <div className="">Place here</div>
                        </div>
                    </div>
                        <button className="place-btn">Add Place</button>
                </div>
                <button className="notes-btn">Notes</button>
            </div>
        </>
    )
}