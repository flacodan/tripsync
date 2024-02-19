import './ToDoRow.css'
import axios from 'axios'

export default function ToDoRow(props){
//    console.log(props)
    async function doneTask(e){
        e.preventDefault()
        let maBod = {
           todoId: props.todo.to_do_id
        }
        // console.log(maBod)
        
        axios.put('/done-task', maBod)
        .then((response) => {
            props.setTodoName(response.data)
            console.log('glarg')
            console.log(response.data)
            console.log('blagg')
        })
    }

    return (
        <>
            <div className="row-container">
                <button className="checkbox" onClick={doneTask}>x</button>
                <div className="todo">{props.todo.to_do_name}</div>
                <div className="trip">{props.todo.trip_name}</div>
            </div>
        </>
    )
}
