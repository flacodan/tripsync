import './Trips.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ImCheckmark2, ImCheckboxChecked } from "react-icons/im";
import Map from './Maps.jsx'

export default function Trips(){
        
    const [trip, setTrip] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const { trip_id } = useParams(null);
    const [pageTrip_id, setPageTrip_id] = useState(trip_id);
    const [pinName, setPinName] = useState([]);
    const [todoModalIsShown, setTodoModalIsShown] = useState(false);
    const [modalIsShown, setModalIsShown] = useState(false);
    const [todoData, setTodoData] = useState();
   


    useEffect(() => {
        const fetchTrip = async () => {
            if(trip_id){
                try {
                    const response = await axios.post('/api/getTrip', {trip_id: trip_id});
                    // console.log(JSON.stringify(response.data));
                    setTrip(response.data[0]);

                    if(response.data) {
                        const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
                        const todoData = todoResponse.data;
                        setTodoList(todoData);
                        
                        // console.log("Trips.useEffect " + JSON.stringify(todoList[1]));
                    }
                } catch (error) {
                    console.error('Error getting trip: ');
                };
            } else { console.log("No trip id"); };
        };
        fetchTrip();
    }, [trip_id]);

    useEffect(() => {
        setPageTrip_id(trip_id);
        axios.get('/pin-place', {params: {trip_id: pageTrip_id}})
        .then((response) => {
            // console.log(trip_id)
        //   console.log(response.data)
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

    const todos = Array.isArray(todoList) ? (
        todoList.map((todo) => (
            <div key={todo.to_do_id} className="row-container1" onClick={() => clickTodoRow(todo.to_do_id)}>
                <button 
                    className="YN" 
                    onClick={(event) => { clickTodoComplete(event, todo.to_do_id) }}
                >
                    { todo.to_do_complete ? <ImCheckboxChecked style={{color:"#6c757d", fontSize: '3rem'}} /> : <ImCheckmark2 style={{color:"#d9dadb", fontSize: '2rem'}} /> }
                </button>
                <div className="">{todo.to_do_name}</div>
                {todo.username && (
                <div className="">{todo.username}</div>
                )}
            </div>
        ))
    ) : null;

    const clickTodoRow = (clickedId) => {
        const clickedTodoData = todoList.find((todoItem) => todoItem.to_do_id === clickedId);
        setTodoData(clickedTodoData);
        setTodoModalIsShown(true);
    };

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

    function onPlaceClick() {
        setModalIsShown(true);
    }

    function closeTodoModal() {
        setTodoModalIsShown(false);
    }

    function closeModal() {
        setModalIsShown(false);
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <>
          <div>
            {<Map trip_id={pageTrip_id}/>}
          </div>
            <div className="trip-name">{trip.trip_id}</div>
            <div className="trip-lists">
                <div className="trip-list">
                    <div className="header-container1">
                        <div className="todo2">To-Do</div>
                        <div className="owner">Owner</div>
                    </div>
                    <div className='table-container1'>
                        { todos }
                    </div>
                    <div>
                        { todoModalIsShown
                            ? <>
                                <div className="modal-wrapper">
                                    <div className="modal-box">
                                        <button className="buttonX" onClick={closeTodoModal}>x</button>
                                        <form action="/trips" method="post">
                                            <ul>
                                                <li className='formLI'>
                                                    <label htmlFor="todo-name">To-do:</label>
                                                    <input 
                                                        type="text" 
                                                        id="todo-name" 
                                                        name="todo-name" 
                                                        value={todoData.to_do_name}
                                                        onChange={handleInputChange}
                                                    />
                                                </li>
                                                <li className='formLI'>
                                                    <label htmlFor="todo-owner">Owner: </label>
                                                    <input type='text' id="todo-owner" name="todo-owner" value={todoData.username ? todoData.username : ""} />
                                                    <button>I'll do it!</button>
                                                </li>
                                                <li className='formLI'>
                                                    <button>Complete</button>
                                                </li>
                                            </ul>
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </>
                            : null
                        }
                    </div>
                    <button className="to-do-btn">Add To-Do</button>
                </div>
                <button className="notes-btn">Notes</button>
            </div>
        </>
    )
}
