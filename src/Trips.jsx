import './Trips.css'

export default function Trips(){


    return (
        <>
            <div className="trip-name">Boston</div>
            <div className="trip-lists">
                <div className="trip-list">
                    <div className="header-container1">
                        <div className="todo2">To-Do</div>
                        <div className="owner">Owner</div>
                    </div>
                    <div className='table-container1'>
                        <div className="row-container1">
                            <button className="YN">X</button>
                            <div className=''>To-Do here</div>
                            <div className="">Owner here</div>
                        </div>
                    </div>
                        <button className="to-do-btn">Add To-Do</button>
                </div>
                <div className="trip-list">
                    <div className="header-container2">
                        <div className="pin">Pin</div>
                        <div className="place">Place</div>
                    </div>
                    <div className='table-container2'>
                        <div className="row-container2">
                            <div className=''>Pin here</div>
                            <div className="">Place here</div>
                        </div>
                    </div>
                        <button className="place-btn">Add Place</button>
                </div>
                <button className="notes-btn">Notes</button>
            </div>
        </>
    )
}