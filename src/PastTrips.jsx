
import { useEffect, useState } from 'react'
import axios from 'axios';
import NavBar from './Navbar';
import { MdDeleteOutline } from "react-icons/md";


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
            window.location.reload();
        } catch (error) {
            console.error('Error deleting trip');
        };
        console.log("Chose to delete trip id " + clickedTripId);
    }

    return (
        <>
        <NavBar/>
        <div className='page-container'>
            <div className='page-header'>Past Trips</div>
            <div className="header-container">
                <div className="trip-header">Trip</div>
                <div className="date-header">Date</div>
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
                            <div className='trip'>{trip.trip_start}</div>
                            <button className="checkbox" title={`Delete`} onClick={ () => handleDeleteTrip(trip.trip_id)}><MdDeleteOutline /></button>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>
        </>
    )
}