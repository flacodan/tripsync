import './Trips.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImCheckmark2, ImCheckboxChecked } from "react-icons/im";

export default function Trips(){

    const { trip_id } = useParams(null);
    const [trip, setTrip] = useState([]);
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const fetchTrip = async () => {
            if(trip_id){
                try {
                    const response = await axios.post('/api/getTrip', {trip_id: trip_id});
                    setTrip(response.data[0]);

                    if(response.data) {
                        const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
                        const todoData = todoResponse.data;
                        setTodoList(todoData);
                    }
                } catch (error) {
                    console.error('Error getting trip: ');
                };
            } else { console.log("No trip id"); };
        };
        fetchTrip();
    }, [trip_id]);

    const todos = Array.isArray(todoList) ? (
        todoList.map((todo) => (
            <div key={todo.to_do_id} className="row-container1" onClick={() => clickTodoRow(todo.to_do_id)}>
                <button 
                    className="YN" 
                    onClick={(event) => { clickTodoComplete(event, todo.to_do_id) }}
                >
                    { todo.to_do_complete ? <ImCheckboxChecked style={{color:"#6c757d", fontSize: '3rem'}} /> : <ImCheckmark2 style={{color:"#d9dadb", fontSize: '2rem'}} /> }
                </button>
                <div className=''>{todo.to_do_name}</div>
                <div className="">{todo.user_id}</div>
            </div>
        ))
    ) : null;

    const clickTodoComplete = async (event, clickedId) => {    
        event.stopPropagation();
        // const prevTodoList = todoList;
        const clickedTodoData = todoList.find((todo) => todo.to_do_id === clickedId);
        const newComplete = !clickedTodoData.to_do_complete;
        const mergedData = { ...clickedTodoData, to_do_complete: newComplete };
        try {
                console.log("Trips.clicktodocomplete; about to call api with data " + JSON.stringify(mergedData));
                const response = await axios.put(`/api/todoUpdate/${clickedId}`, mergedData);
                // fetchTodoData();  //might need to renew data loaded in State for todoList, create function to get it
            } catch (error) {
                console.error('Error updating data:', error);
            }
    };

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
                        { todos }
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