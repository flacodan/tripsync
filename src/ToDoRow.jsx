import './ToDoRow.css'
import axios from 'axios'

export default function ToDoRow(props) {

    async function doneTask(e) {
        e.preventDefault();
        let maBod = {
            todoId: props.todo.to_do_id
        };

        axios.put('/done-task', maBod)
            .then((response) => {
                console.log(response.data)
                props.setTodoName(response.data);
                console.log('glarg');
                console.log(response.data);
                console.log('blagg');
                // Remove the row from the page
                // e.target.closest('.row-container').remove();
            });
    }

    return (
        <>
            <div className="row-container">
                <button className="checkbox" onClick={doneTask}>X</button>
                <div className="todo">{props.todo.to_do_name}</div>
                <div className="trip">{props.todo.trip_name}</div>
            </div>
        </>
    )
}
