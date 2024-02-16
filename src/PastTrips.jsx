
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
          <div className="header-container">
                <div className="task">Trip</div>
                <div className="location">Date</div>
          </div>
        <div className='top-container'>
        {pastTripList && (
            <div className='table-container'>
                {pastTripList.map((trip) => (
                    <div
                        key={trip.trip_id}
                        id={trip.trip_id}
                        name={trip.trip_name}
                        className='row-container'
                        
                    >
                        {/* <div>{trip.trip_complete} Complete</div> */}
                        <div className='todo'>{trip.trip_name}</div>
                        <div className='trip'>Date: {trip.trip_start}</div>
                        <button className="checkbox" onClick={ () => handleDeleteTrip(trip.trip_id)}>X</button>
                    </div>
                ))}
            </div>
        )}
        </div>
        </>
    )
}