import './Trips.css';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { ImCheckmark2, ImCheckboxChecked } from "react-icons/im";
import Map from './Maps.jsx'
=======
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import ToDoModal from './ToDoModal';
>>>>>>> dh-todoModal

export default function Trips(){
        
    const [trip, setTrip] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const { trip_id } = useParams(null);
    const [pinName, setPinName] = useState([]);
    const [todoModalIsShown, setTodoModalIsShown] = useState(false);
    const [notesModalIsShown, setNotesModalIsShown] = useState(false);
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
                    }
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
<<<<<<< HEAD
        //   console.log(response.data)
          let pinNameArr = []
          for (let i = 0; i < response.data.length; i++) {
            // console.log(response.data[i].pin_name)
            pinNameArr.push(response.data[i].pin_name)
          }
        //   console.log(pinNameArr)
        setPinName(pinNameArr)
     
=======
            console.log(response.data)
            let pinNameArr = []
            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].pin_name)
                pinNameArr.push(response.data[i].pin_name)
            }
            //   console.log(pinNameArr)
            setPinName(pinNameArr)
            
>>>>>>> dh-todoModal
        })
        .catch(() => {
            console.log('yeeeeeep, errorp');
        });
    }, []);

    const handleSaveChanges = async (updatedData) => {
        if(todoData.to_do_id){
            const prevTodoData = todoData;
            const mergedData = { ...prevTodoData, ...updatedData };
            try {
                const response = await axios.put(`/api/todoUpdate/${prevTodoData.to_do_id}`, mergedData);
                setTodoModalIsShown(false);
                const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
                const updatedTodoList = todoResponse.data;
                setTodoList(updatedTodoList);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {handleAddTodo(updatedData);}
    };

    const handleAddTodo = async (updatedData) => {
        try {
            const newData = {...updatedData, to_do_complete: false};
            const response = await axios.post(`/api/newTodo/${trip_id}`, newData);
            setTodoModalIsShown(false);
            const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
            const updatedTodoList = todoResponse.data;
            setTodoList(updatedTodoList);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    
    const handleTodoClick = (clickedId) => {
        const clickedTodoData = todoList.find((todoItem) => todoItem.to_do_id === clickedId);
        setTodoData(clickedTodoData);
        setTodoModalIsShown(true);
    };
    
    const clickTodoComplete = async (event, clickedId) => {    
        event.stopPropagation();
        const clickedTodoData = todoList.find((todo) => todo.to_do_id === clickedId);
        const newComplete = !clickedTodoData.to_do_complete;
    
        try {
            const updatedData = { to_do_complete: newComplete };
            const response = await axios.put(`/api/todoUpdate/${clickedId}`, updatedData);
            const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
            const updatedTodoList = todoResponse.data;
            setTodoList(updatedTodoList);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    function onPlaceClick() {
        setNotesModalIsShown(true);
    }
    
    const handleDeleteTodo = async () => {  // !!!!!!!!! Warn user before delete? !!!!!!!!!!!!!!!!!!
        const prevTodoData = todoData; 
        try {
            const response = await axios.delete(`/api/deleteTodo/${prevTodoData.to_do_id}`);
            setTodoModalIsShown(false);
            const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
            const updatedTodoList = todoResponse.data;
            setTodoList(updatedTodoList);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }      
    
    function handleCloseTodoModal() {
        setTodoModalIsShown(false);
    }
    
    function closeNotesModal() {
        setNotesModalIsShown(false);
    }
    
    const todos = Array.isArray(todoList) ? (
        
        todoList.map((todo) => (
            <div key={todo.to_do_id} className="row-container1" onClick={() => handleTodoClick(todo.to_do_id)}>
                <button 
                    className="completeBtn" 
                    title={`Change completion status`}
                    onClick={(event) => { clickTodoComplete(event, todo.to_do_id) }}
                >
                    { todo.to_do_complete ? <FiCheckCircle style={{color:"#6c757d", fontSize: '2rem'}} /> : <FiCircle style={{color:"#d9dadb", fontSize: '2rem'}} /> }
                </button>
                <div className="todo2">{todo.to_do_name}</div>
                {todo.username && (
                <div className="owner">{todo.username}</div>
                )}
            </div>
        ))
    ) : null;
    

    return (
        <>
          <div>
                    {<Map/>}
                </div>
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
                    <button className="to-do-btn" onClick={() => 
                        { 
                            setTodoModalIsShown(true);
                            setTodoData({});
                        }}>
                        Add To-Do
                        </button>
                </div>
                <div className='trip-list'>
                    <div className='header-container1'>
                        <div>Notes</div>
                    </div>
                    <div className='table-container1'>
                        <p>Here there be notes</p>
                    </div>
                <button className="notes-btn" onClick={() => setNotesModalIsShown(true)}>Notes</button>
                </div>
<<<<<<< HEAD
                <button className="notes-btn">Notes</button>
=======
            </div>
            
            <div>
                { notesModalIsShown
                    ? <>
                        <div className="modal-wrapper">
                            <div className="modal-box">
                                <button className="buttonX" onClick={closeNotesModal}>x</button>
                                <input placeholder="Notes for this trip" className="input" type="text"></input>
                            </div>
                        </div>
                    </>
                    : null
                }
            </div>
            <div>
                { todoModalIsShown && (
                    <ToDoModal
                        todoData={todoData}
                        onDelete={handleDeleteTodo}
                        onClose={handleCloseTodoModal}
                        onSaveChanges={handleSaveChanges}
                    />
                )}
>>>>>>> dh-todoModal
            </div>
        </>
    )
}
