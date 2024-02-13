import './ToDo.css'
import ToDoRow from './ToDoRow.jsx'
import { useEffect } from 'react'
import axios from 'axios'


export default function ToDo(){


    useEffect(() => {
        axios.get('/open-to-do')
        .then((response) => {

        })
    }, [])

    return (
        <> 
            <div className="dropdown">
                <button className="dropbtn">Filter by Trip</button>
                <div class="dropdown-options">
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
                { 
                    <ToDoRow/>
                }
            </body>
        </>
    )
}