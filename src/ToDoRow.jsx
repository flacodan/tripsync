import './ToDoRow.css'

export default function ToDoRow(props){
   
        return (
            <>
                <div className="row-container">
                    <button className="checkbox">x</button>
                    <div className="todo">{props.todo.to_do_name}</div>
                    <div className="trip">{props.todo.trip_name}</div>
                </div>
            </>
        )
    }