import "./Table.css";

const Table = () => {
  return (
    <div className="table">
      
      <section className="first-rectangle" />
      <section className="first-rectangle1" />
      <section className="first-rectangle2" />
      <section className="first-rectangle3" />
      <section className="first-rectangle4" />
      <section className="third-rectangle">
        <div className="frame-with-todo">
          <h1 className="to-do2">{`To-do `}</h1>
        </div>
        <div className="frame-with-components">
          <div className="frame-with-frame-and-text">
            <div className="completed-frame">
              <div className="ellipse-with-completed-text">
                <i className="completed">Completed</i>
                <div className="reservation-frame" />
              </div>
            </div>
            <div className="empty-frame">
              <i className="name">Name</i>
              <b className="make-dinner-reservations">
                Make dinner reservations
              </b>
            </div>
            <div className="blank-frame">
              <i className="date">Date</i>
              <div className="empty-text-frame">
                <b className="second-empty-frame">03/20/2024</b>
              </div>
            </div>
          </div>
          <div className="bring-ice-chest-frame">
            <div className="frames-with-ellipses-x">
              <div className="elliptic-frame" />
              <div className="vector-frame">
                <b className="bring-ice-chest">Bring ice chest</b>
              </div>
              <div className="nested-frames">
                <b className="empty-frame1">03/20/2024</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="frame-with-frames">
        <div className="ellipse-and-xframes">
          <div className="framed-text">
            <div className="paired-ellipses">
              <div className="intersecting-ellipses" />
              <h3 className="x">X</h3>
            </div>
            <div className="paired-ellipses1">
              <div className="paired-ellipses-child" />
              <h3 className="x1">X</h3>
            </div>
          </div>
          <div className="pack-and-sunscreen">
            <div className="framed-text-with-action">
              <b className="pack-towel">Pack towel</b>
              <b className="bring-sunscreen">Bring sunscreen</b>
            </div>
          </div>
          <div className="empty-frame-with-slash">
            <div className="single-frame">
              <b className="nested-frames-with">03/20/2024</b>
              <b className="nested-frames-with1">03/20/2024</b>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Table;
