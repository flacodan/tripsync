import './Trips.css'

export default function Trips(){


    return (
        <>
          <div className="trip-name">Boston</div>
          <div className="header-container1">
                <div className="todo">To-Do</div>
                <div className="owner">Owner</div>
            </div>
            <div className='table-container1'>
                <div className="row-container1">
                    <button className="">X</button>
                    <div className=''>To-Do here</div>
                    <div className="">Owner here</div>
                </div>
            </div>
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
        </>
    )
}