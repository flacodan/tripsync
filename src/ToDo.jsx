import './ToDo.css'
import ToDoRow from './ToDoRow.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function ToDo(){

    const [todoName, setTodoName] = useState([])


    useEffect(() => {
        axios.get('/open-to-do')
        .then((response) => {
            // console.log(response.data)
            let todoArr = []
            for (let i = 0; i < response.data.length; i++) {
                todoArr.push(response.data[i].to_do_name)
            }
            // console.log(todoArr)
            setTodoName(todoArr)
            console.log(todoName)
        })
        .catch((error) => {
            console.log('yeeeeeep, error') 
            console.log(error)
        })
    }, [])

    return (
        <> 
            <div className="dropdown">
                <button className="dropbtn">Filter by Trip</button>
                <div className="dropdown-options">
                    <a href="#">OBX</a>
                    <a href="#">Boston</a>
                    <a href="#">SLC</a>
                </div>
            </div>

            <div className="header-container">
                <div>Task</div>
                <div>Location</div>
            </div>
            <body>
                { todoName.map((todo) => {
                    return (<ToDoRow
                        todoName = {todo}
                    />)
                })
                }
            </body>
        </>
    )
}