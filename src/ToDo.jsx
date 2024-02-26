import './ToDo.css'
import ToDoRow from './ToDoRow.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function ToDo(){

    const [todoName, setTodoName] = useState([])
    const [filteredTodos, setFilteredTodos] = useState([])

    useEffect(() => {
        axios.get('/open-to-do')
        .then((response) => {
            let todoArr = []
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                todoArr.push({
                    to_do_name: response.data[i].to_do_name,
                    trip_name: response.data[i].trip.trip_name,
                    to_do_id: response.data[i].to_do_id
                })
            }
            setTodoName(todoArr)
        })
        .catch((error) => {
            console.error('Error fetching todo data:', error);
        })
    }, [])

    const filterByTripName = (tripName) => {
        const filtered = todoName.filter(todo => todo.trip_name === tripName)
        setFilteredTodos(filtered)
    }

    return (
        <> 
            <div className="dropdown">
                <button className="dropbtn">Filter by Trip</button>
                <div className="dropdown-options">
                    { [...new Set(todoName.map(todo => todo.trip_name))].map(tripName => (
                        <a href="#" onClick={() => filterByTripName(tripName)}>{tripName}</a>
                    ))}
                    <a href='#' onClick={() => window.location.reload()}>See all to do's</a>
                </div>
            </div>

            <div className="header-container">
                <div className="task">Task</div>
                <div className="location">Location</div>
            </div>
            <div className='table-container'>
                { filteredTodos.length > 0 ? (
                    filteredTodos.map((todo) => (
                        <ToDoRow
                            todo={todo}
                            todoName={todoName}
                            setTodoName={setTodoName}
                        />
                    ))
                ) : (
                    todoName.map((todo) => (
                        <ToDoRow
                            todo={todo}
                            todoName={todoName}
                            setTodoName={setTodoName}
                        />
                    ))
                )}
            </div>
        </>
    )
}