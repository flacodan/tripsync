
import { useEffect, useState } from 'react'
import axios from 'axios';


export default function PastTrips(){

    const [pastTripList, setPastTripList] = useState([]);

    useEffect(() => {
        const fetchPastTrips = async () => {
        try {
            console.log("about to call api for past trips");
            const response = await axios.get('/api/getPastTrips');
            console.log(JSON.stringify(response.data));
            setPastTripList(response.data);
        } catch (error) {
            console.error('Error getting trips: ');
        };
        };
        fetchPastTrips();
        console.log("End of useEffect " + pastTripList);
    }, []);

    const handleDeleteTrip = async (clickedTripId) => {
        //trigger modal to confirm deleting the clicked trip
        try {
            const response = await axios.delete(`/api/deleteTrip/${clickedTripId}`)
        } catch (error) {
            console.error('Error deleting trip');
        };
        console.log("Chose to delete trip id " + clickedTripId);
    }

    return (
        <>
        {pastTripList && (
            <div id='trip-card-container' >
                {pastTripList.map((trip) => (
                    <div
                        key={trip.trip_id}
                        id={trip.trip_id}
                        name={trip.trip_name}
                        className='trip-card-row'
                        
                    >
                        <div>{trip.trip_complete} Complete</div>
                        <div><h3>{trip.trip_name}</h3></div>
                        <div><h4>Date: {trip.trip_start}</h4></div>
                        <button onClick={ () => handleDeleteTrip(trip.trip_id)}>Del</button>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}