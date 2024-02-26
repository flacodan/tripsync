import { useState, useEffect } from 'react';
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

export default function ToDoModal({ todoData, onDelete, onClose, onSaveChanges }) {  

    const [formData, setFormData] = useState({
        to_do_name: todoData.to_do_name || '',
        username: todoData.username || '',
        user_id: todoData.user_id || null,
    });

    const [isChecked, setIsChecked] = useState(todoData.to_do_complete !== undefined ? todoData.to_do_complete : false);


    const currentUser = {user_id: 1, username: 'Bob'}; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Fix this to use current logged in user !!!!!!!!!!!!!!!!!!!!!!
    
    useEffect(() => {
        setFormData({
            to_do_name: todoData.to_do_name || '',
            username: todoData.username || '',
            user_id: todoData.user_id || null,
        });
    }, [todoData]);

    const handleToggleChange = () => {
        // console.log("Todo complete was" + isChecked);
        // console.log("Todo complete prevChecked " + prevChecked);
        setIsChecked(!isChecked);
    };

    const handleTakeOwnership = () => {
        // setTakeOwnership(true);
        setFormData(prevData => ({
            ...prevData,
            user_id: currentUser.user_id,
            username: currentUser.username,
        }));
    };

    const handleSubmit = async (e) => {
        console.log("Submit: Todo complete " + isChecked);
        e.preventDefault();
        const updatedTodoData = {
            ...todoData,
            ...formData,
            to_do_complete: isChecked,
        };
        onSaveChanges(updatedTodoData);
    };
    
    const handleClose = () => {
        setFormData({
            to_do_name: '',
            username: '',
            user_id: null,
        });
        onClose();
    };

    return (
        <div className="modal-wrapper">
          <div className="modal-box">
            <button className="buttonX" onClick={handleClose}>x</button>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className='formLI'>
                    <label htmlFor="todo-name">To-do:</label>
                    <input 
                        type="text" 
                        id="todo-name" 
                        name="to_do_name" 
                        value={formData.to_do_name}
                        onChange={(e) => setFormData({ ...formData, to_do_name: e.target.value })}
                    />
                    </li>
                    <li className='formLI'>
                        <label>
                        Owner: {formData.username}
                        </label>
                        {!formData.username && (
                            <button title={`Set yourself as owner`} onClick={handleTakeOwnership}>I'll do it!</button>
                        )}
                    </li>
                    <li className='formLI'>
                        <button 
                            className='toggle-button' 
                            onClick={handleToggleChange}
                            title={`Change completion status`}
                            type="button"
                            >
                            {isChecked ? 
                            <FiCheckCircle style={{color:"#6c757d", fontSize: '2rem'}} /> 
                            : <FiCircle style={{color:"#d9dadb", fontSize: '2rem'}} />
                            }
                        </button>
                        <div className='me-auto'>
                            {todoData.to_do_id && (
                                <button title={`Delete`} onClick={onDelete}>
                                    <MdDeleteOutline />
                                </button>
                            )}
                        </div>
                    </li>
                </ul>
                <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    );
}

