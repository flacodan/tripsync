import { useState, useEffect } from 'react';
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";
import './TripModal.css'

export default function TripModal({ tripData, onDelete, onClose, onSaveChanges }) {  

    const [formData, setFormData] = useState({
        trip_name: tripData.trip_name || '',
        trip_start: tripData.trip_start || '',
        trip_code: tripData.trip_code || '',
        trip_complete: tripData.trip_complete || false,
        username: tripData.username || '',
        user_id: tripData.user_id || null,
    });

    const [isTripChecked, setIsTripChecked] = useState(tripData.trip_complete !== undefined ? tripData.trip_complete : false);
    
    useEffect(() => {
        setFormData({
            trip_name: tripData.trip_name || '',
            trip_start: tripData.trip_start || null,
            trip_code: tripData.trip_code || '',
            trip_complete: tripData.trip_complete || false,
            username: tripData.username || '',
            user_id: tripData.user_id || null,
        });
    }, [tripData]);

    const handleToggleChange = () => {
        setIsTripChecked(!isTripChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTripData = {
            ...tripData,
            ...formData,
            trip_complete: isTripChecked,
        };
        onSaveChanges(updatedTripData);
    };
    
    const handleCopyCode = async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(formData.trip_code)
        .then(() => {
        console.log('Code copied to clipboard'); // alert user that code was copied !!!!!!!!!
      })
      .catch(err => {
        console.error('Failed to copy code: ', err);
      });
    };

    // return formData to defaults if user clicks Cancel
    const handleCloseTripModal = () => {
        setFormData({
            trip_name: '',
            trip_start: null,
            trip_code: '',
            trip_complete: false,
        });
        onClose();
    };

    const handleDelete = () => {
        onDelete();
    }

    return (
        <div className="modal-wrapper">
          <div className="modal-box">
            <form className="form" onSubmit={handleSubmit}>
            <button className="buttonX" onClick={() => handleCloseTripModal()}>x</button>
                <ul className="formUl">
                    <li className='formLI'>
                        <label className="to-do" htmlFor="trip-name">Trip:</label>
                    </li>
                    <li className='formLI'>

                        <input 
                            type="text" 
                            id="trip-name" 
                            name="trip_name" 
                            value={formData.trip_name}
                            onChange={(e) => setFormData({ ...formData, trip_name: e.target.value })}
                        />
                    </li>
                    <li className='formLI'>
                        <label className='owner1'>
                            Sharing Code: {formData.trip_code}
                        </label>
                    </li>
                    <li className='formLI'>
                        <button title={`Copy the code`} onClick={handleCopyCode}>
                            <MdContentCopy />
                        </button>
                    </li>
                    <li className='formLI formLI--row'>
                        <label className="comp">Complete?</label>
                        <button 
                            className='toggle-button' 
                            onClick={handleToggleChange}
                            title={`Change completion status`}
                            type="button"
                            >
                            {isTripChecked ? 
                            <FiCheckCircle style={{color:"#6c757d", fontSize: '2rem'}} /> 
                            : <FiCircle style={{color:"#d9dadb", fontSize: '2rem'}} />
                            }
                        </button>
                    </li>
                    <li className='formLI formLI--row formLI--right'>
                        {/* <div className='me-auto'> */}
                            {tripData.trip_id && (
                                <>
                                <button type="submit">Submit</button>
                                <button title={`Delete`} onClick={() => handleDelete()}>
                                    <MdDeleteOutline />
                                </button>
                                </>
                            )}
                        {/* </div> */}
                    </li>
                </ul>
            </form>
          </div>
        </div>
    );
}

