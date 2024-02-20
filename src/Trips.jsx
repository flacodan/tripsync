import './Trips.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trips(){

    const [trip, setTrip] = useState([]);
    const { trip_id } = useParams(null);
    // console.log("Trips.trip_id: " + trip_id);
    const [pinName, setPinName] = useState([]);
    const [modalIsShown, setModalIsShown] = useState(false)

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

    useEffect(() => {
        axios.get('/pin-place', {params: {trip_id: trip_id}})
        .then((response) => {
          console.log(response.data)
          let pinNameArr = []
          for (let i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].pin_name)
            pinNameArr.push(response.data[i].pin_name)
          }
        //   console.log(pinNameArr)
        setPinName(pinNameArr)
     
        })
        .catch(() => {
            console.log('yeeeeeep, errorp');
        });
    }, []);

    function onPlaceClick() {
        setModalIsShown(true);
    }

    function closeModal() {
        setModalIsShown(false);
    }

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
                            {pinName.map((name) => (
                        <div className="row-container2">
                                <div>Pin here</div>
                                <div>{name}</div>
                        </div>
                            ))}
                    </div>
                        <button onClick={onPlaceClick} className="place-btn">Add Place</button>
                        { modalIsShown
                ? <>
                    <div className="modal-wrapper">
                        <div className="modal-box">
                            <button className="buttonX" onClick={closeModal}>x</button>
                            <input placeholder="Pin name here..." className="input" type="text"></input>
                        </div>
                    </div>
                </>
                : null
            }
                </div>
                <button className="notes-btn">Notes</button>
            </div>
        </>
    )
}