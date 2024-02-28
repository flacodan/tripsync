import './ToDoRow.css'
import axios from 'axios'
import { MdDeleteOutline } from "react-icons/md";
import { FiCircle, FiCheckCircle } from "react-icons/fi";

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
                <button
                    className="completeBtn checkbox"
                    title={`Change completion status`}
                    onClick={(event) => {
                        props.handleTodoComplete(event, props.todo.to_do_id);
                    }}
                >
                    {props.todoComplete ? (
                        <FiCheckCircle style={{ color: '#2b334a', fontSize: '2rem' }} />
                    ) : (
                        <FiCircle style={{ color: '#2b334a', fontSize: '2rem' }} />
                    )}
                </button>
                <div className="todo">{props.todo.to_do_name}</div>
                <div className="trip">{props.todo.trip_name}</div>
            </div>
        </>
    );
}
