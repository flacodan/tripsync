import './ToDo.css'
import ToDoRow from './ToDoRow.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function ToDo(){

    const [todoName, setTodoName] = useState([])
    


    useEffect(() => {
        axios.get('/open-to-do')
        .then((response) => {
            let todoArr = []
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i].trip.trip_name)
                todoArr.push({
                    to_do_name: response.data[i].to_do_name,
                    trip_name: response.data[i].trip.trip_name,
                    to_do_id: response.data[i].to_do_id
                })
            }
            // console.log(todoArr)
            setTodoName(todoArr)
        })
        .catch((error) => {
            console.log('yeeeeeep, error')
        })
    }, [])
    // console.log(todoName)


// didnt need (evan)
    // useEffect(() => {
    //     axios.get('/to-do-trip-name')
    //     .then((response) => {
    //         console.log(response.data)
    //         let tripObj = {}
    //         for (let i = 0; i < response.data.length; i++) {
    //             tripObj[response.data[i].trip_id] = response.data[i].trip_name
    //         }
    //         console.log(tripObj)
    //         setTripName(tripObj)
    //     })
    //     .catch((error) => {
    //         console.log('yeeeeeep, error') 
    //     })
    // }, [])

    return (
        <> 
            { todoName.map((todo) => {
                console.log(todo)
                return (
                    <div className="dropdown">
                        <button className="dropbtn">Filter by Trip</button>
                        <div className="dropdown-options">
                            <a href="#">{ todo.trip_name }</a>
                        </div>
                    </div>
                )
            })
            }

            <div className="header-container">
                <div>Task</div>
                <div>Location</div>
            </div>
            <body>
                { todoName.map((todo) => {
                    return (<ToDoRow
                        todo = {todo}
                        todoName = {todoName}
                        setTodoName = {setTodoName}
                    />)
                })
                }
            </body>
        </>
    )
}