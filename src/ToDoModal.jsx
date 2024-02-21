import { useState, useEffect } from 'react';
import { ImCheckmark2, ImCheckmark } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";

export default function ToDoModal({ todoData, show, onDelete, onClose, onSaveChanges }) {  

    <div className="modal-wrapper">
          <div className="modal-box">
            <button className="buttonX" onClick={closeTodoModal}>x</button>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className='formLI'>
                    <label htmlFor="todo-name">To-do:</label>
                    <input 
                        type="text" 
                        id="todo-name" 
                        name="todo-name" 
                        value={todoData.to_do_name || ''}
                        onChange={handleInputChange}
                    />
                    </li>
                    <li className='formLI'>
                        <label>
                        Owner: {currentUser || todoData.username || ""}
                        </label>
                        {!todoData.username && (
                            <button onClick={handleTakeOwnership}>I'll do it!</button>
                        )}
                    </li>
                    <li className='formLI'>
                        <button 
                            className='toggle-button' 
                            onClick={handleToggleChange}
                            type="button"
                            >
                            {isChecked ? 
                            <ImCheckboxChecked style={{color:"#6c757d", fontSize: '3rem'}} /> 
                            : <ImCheckmark2 style={{color:"#d9dadb", fontSize: '2rem'}} />
                            }
                        </button>
                    </li>
                </ul>
                <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      
}
