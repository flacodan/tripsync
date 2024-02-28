import { useState, useEffect } from 'react';
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import './ToDoModal.css'

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
            
            <form className="form" onSubmit={handleSubmit}>
            <button className="buttonX" onClick={() => handleClose()}>x</button>
                <ul className="formUl">
                    <li className='formLI'>
                        <label className="to-do" htmlFor="todo-name">To-do</label>
                    </li>
                    <li className='formLI'>
                        <input 
                            type="text" 
                            id="todo-name" 
                            name="to_do_name" 
                            value={formData.to_do_name}
                            onChange={(e) => setFormData({ ...formData, to_do_name: e.target.value })}
                            />
                    </li>
                    <li className='formLI'>
                        <label className='owner1'>
                        Owner {formData.username}
                        </label>
                    </li>
                    <li className='formLI'>
                        {!formData.username && (
                            <button className="me" title={`Set yourself as owner`} onClick={handleTakeOwnership}>I'll do it!</button>
                            )}
                    </li>
                    <li className='formLI formLI--row'>
                        {/* <section className="lkjh"> */}
                        <p className="comp">Completed?</p>
                        <button 
                            className='toggle-button' 
                            onClick={() => handleToggleChange()}
                            title={`Change completion status`}
                            type="button"
                            >
                            {isChecked ? 
                            <FiCheckCircle style={{color:"#6c757d", fontSize: '2rem'}} /> 
                            : <FiCircle style={{color:"#d9dadb", fontSize: '2rem'}} />
                            }
                        </button>
                        {/* </section> */}
                        
                    </li>
                    <li className='formLI formLI--row formLI--right'>
                        {/* <div className='me-auto'> */}
                            {/* {todoData.to_do_id && ( */}
                                <>
                                <button className="sub1" type="submit">Submit</button> 
                                <button className="d"title={`Delete`} onClick={() => onDelete()}>
                                    <MdDeleteOutline />
                                </button>
                                </>
                            {/* )} */}
                        {/* </div> */}
                    </li>
                </ul>
                
            </form>
          </div>
        </div>
    );
}

