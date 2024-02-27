import { useState, useEffect } from 'react';
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdDeleteOutline, MdContentCopy } from "react-icons/md";

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
            <button className="buttonX" onClick={() => handleCloseTripModal()}>x</button>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li className='formLI'>
                    <label htmlFor="trip-name">Trip:</label>
                    <input 
                        type="text" 
                        id="trip-name" 
                        name="trip_name" 
                        value={formData.trip_name}
                        onChange={(e) => setFormData({ ...formData, trip_name: e.target.value })}
                    />
                    </li>
                    <li className='formLI'>
                        <label>
                            Sharing Code: {formData.trip_code}
                        </label>
                        <button title={`Copy the code`} onClick={handleCopyCode}>
                            <MdContentCopy />
                        </button>
                    </li>
                    <li className='formLI'>
                        <label>
                            Complete?
                        </label>
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
                        <div className='me-auto'>
                            {tripData.trip_id && (
                                <button title={`Delete`} onClick={() => handleDelete()}>
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

