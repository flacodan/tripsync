import './ToDoRow.css'

export default function ToDoRow(props){
    
        return (
            <>
            <div className="row-container">
                <button className="checkbox">x</button>
                <div className="todo">Reservation</div>
                <div className="trip">Boston</div>
            </div>
            </>
        )
    }