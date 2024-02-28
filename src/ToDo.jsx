import './ToDo.css'
import ToDoRow from './ToDoRow.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from './Navbar';


export default function ToDo(){

    const [todoName, setTodoName] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        axios.get('/open-to-do')
        .then((response) => {
            let todoArr = []
            for (let i = 0; i < response.data.length; i++) {
                todoArr.push({
                    to_do_complete: response.data[i].to_do_complete,
                    to_do_name: response.data[i].to_do_name,
                    trip_name: response.data[i].trip.trip_name,
                    to_do_id: response.data[i].to_do_id
                })
            }
            setTodoName(todoArr)
            console.log(JSON.stringify(todoArr[0]))
        })
        .catch((error) => {
            console.error('Error fetching todo data:', error);
        })
    }, [])

    const filterByTripName = (tripName) => {
        const filtered = todoName.filter(todo => todo.trip_name === tripName)
        setFilteredTodos(filtered)
        console.log("ToDo " + JSON.stringify(filteredTodos));
    }

    const handleTodoComplete = async (event, clickedId) => {
        event.stopPropagation();
        const clickedTodoData = todoName.find(
            (todo) => todo.to_do_id === clickedId
        );
        const newComplete = !clickedTodoData.to_do_complete;
    
        try {
            const updatedData = { to_do_complete: newComplete };
            const response = await axios.put(
                `/api/todoUpdate/${clickedId}`,
                updatedData
            );
            axios.get('/open-to-do')
            .then((response) => {
                let todoArr = []
                for (let i = 0; i < response.data.length; i++) {
                    todoArr.push({
                        to_do_complete: response.data[i].to_do_complete,
                        to_do_name: response.data[i].to_do_name,
                        trip_name: response.data[i].trip.trip_name,
                        to_do_id: response.data[i].to_do_id
                    })
                }
                setTodoName(todoArr)
                console.log(JSON.stringify(todoArr[0]))
            })
            .catch((error) => {
                console.error('Error fetching todo data:', error);
            })
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    

    return (
        <> 
        <NavBar/>
        <div className='page-container'>
            <div className='page-header'>Assigned Tasks</div>
            <div className="dropdown">
                <button className="dropbtn">Filter by Trip</button>
                <div className="dropdown-options">
                    { [...new Set(todoName.map(todo => todo.trip_name))].map(tripName => (
                        <a 
                            href="#" 
                            key={tripName}
                            onClick={() => filterByTripName(tripName)}
                        >
                            {tripName}
                        </a>
                    ))}
                    <a href='#' onClick={() => window.location.reload()}>See all to do's</a>
                </div>
            </div>

            <div className="header-container">
                <div className='done-header'>Done</div>
                <div className="task">Task</div>
                <div className="location">Location</div>
            </div>
            <div className='table-container'>
                { filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <ToDoRow
                            key={todo.to_do_id}
                            todo={todo}
                            todoComplete={todo.to_do_complete}
                            todoName={todoName}
                            setTodoName={setTodoName}
                            handleTodoComplete={handleTodoComplete}
                        />
                    ))
                ) : (
                    todoName.map((todo) => (
                        <ToDoRow
                            key={todo.to_do_id}
                            todo={todo}
                            todoComplete={todo.to_do_complete}
                            todoName={todoName}
                            setTodoName={setTodoName}
                            handleTodoComplete={handleTodoComplete}
                        />
                    ))
                )}
            </div>
        </div>
        </>
    )
}