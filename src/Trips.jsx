import "./Trips.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Maps.jsx";
import { FiCircle, FiCheckCircle } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import ToDoModal from "./ToDoModal";
import TripModal from "./TripModal";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Trips() {
  const [trip, setTrip] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const { trip_id } = useParams(null);
  const [pageTrip_id, setPageTrip_id] = useState(trip_id);
  const [pinName, setPinName] = useState([]);
  const [todoModalIsShown, setTodoModalIsShown] = useState(false);
  const [tripModalIsShown, setTripModalIsShown] = useState(false);
  const [todoData, setTodoData] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrip = async () => {
      if (trip_id) {
        try {
          const response = await axios.post("/api/getTrip", {
            trip_id: trip_id,
          });
          setTrip(response.data[0]);

          if (response.data) {
            const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
            const todoData = todoResponse.data;
            setTodoList(todoData);
          }
        } catch (error) {
          console.error("Error getting trip: ");
        }
      } else {
        console.log("No trip id");
      }
    };
    fetchTrip();
  }, [trip_id]);

  useEffect(() => {
    setPageTrip_id(trip_id);
    axios
      .get("/pin-place", { params: { trip_id: pageTrip_id } })
      .then((response) => {
        // console.log(trip_id)
        // console.log(response.data)
        let pinNameArr = [];
        for (let i = 0; i < response.data.length; i++) {
          // console.log(response.data[i].pin_name)
          pinNameArr.push(response.data[i].pin_name);
        }
        //   console.log(pinNameArr)
        setPinName(pinNameArr);
      })
      .catch(() => {
        console.log("yeeeeeep, errorp");
      });
  }, []);

  const handleSaveChanges = async (updatedData) => {
    if (todoData.to_do_id) {
      const prevTodoData = todoData;
      const mergedData = { ...prevTodoData, ...updatedData };
      try {
        const response = await axios.put(
          `/api/todoUpdate/${prevTodoData.to_do_id}`,
          mergedData
        );
        setTodoModalIsShown(false);
        const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
        const updatedTodoList = todoResponse.data;
        setTodoList(updatedTodoList);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      handleAddTodo(updatedData);
    }
  };

  const handleAddTodo = async (updatedData) => {
    try {
      // const newData = {...updatedData, to_do_complete: false};
      const response = await axios.post(`/api/newTodo/${trip_id}`, updatedData);
      setTodoModalIsShown(false);
      const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
      const updatedTodoList = todoResponse.data;
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleTodoClick = (clickedId) => {
    const clickedTodoData = todoList.find(
      (todoItem) => todoItem.to_do_id === clickedId
    );
    setTodoData(clickedTodoData);
    setTodoModalIsShown(true);
  };

  const clickTodoComplete = async (event, clickedId) => {
    event.stopPropagation();
    const clickedTodoData = todoList.find(
      (todo) => todo.to_do_id === clickedId
    );
    const newComplete = !clickedTodoData.to_do_complete;

    try {
      const updatedData = { to_do_complete: newComplete };
      const response = await axios.put(
        `/api/todoUpdate/${clickedId}`,
        updatedData
      );
      const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
      const updatedTodoList = todoResponse.data;
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

//   function handleTripClick() {
//     setTripModalIsShown(true);
//   }

  const handleDeleteTrip = async () => {
    // !!!!!!!!! Warn user before delete? !!!!!!!!!!!!!!!!!!
    try {
      const response = await axios.delete(
        `/api/deleteTrip/${trip.trip_id}`
      );
      setTripModalIsShown(false);
    //   const tripResponse = await axios.get(`/api/trips/${trip_id}/todos`);
    //   const updatedTodoList = tripResponse.data;
    //   setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error updating Trip data:", error);
    }
    navigate('/home');
  };

  const handleSaveTripChanges = async (updatedData) => {
    if (trip.trip_id) {
      const prevTripData = trip;
      const mergedData = { ...prevTripData, ...updatedData };
      try {
        const response = await axios.post(
          `/api/tripUpdate/${prevTripData.trip_id}`,
          mergedData
        );
        setTripModalIsShown(false);
        window.location.reload();
        // need to refresh page to see updated trip name?????
      } catch (error) {
        console.error("Error updating trip data:", error);
      }
    }
  }

  const handleDeleteTodo = async () => {
    // !!!!!!!!! Warn user before delete? !!!!!!!!!!!!!!!!!!
    const prevTodoData = todoData;
    try {
      const response = await axios.delete(
        `/api/deleteTodo/${prevTodoData.to_do_id}`
      );
      setTodoModalIsShown(false);
      const todoResponse = await axios.get(`/api/trips/${trip_id}/todos`);
      const updatedTodoList = todoResponse.data;
      setTodoList(updatedTodoList);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  function handleCloseTodoModal() {
    setTodoModalIsShown(false);
  }

  function handleCloseTripModal() {
    setTripModalIsShown(false);
  }

  const todos = Array.isArray(todoList)
    ? todoList.map((todo) => (
        <div
          key={todo.to_do_id}
          className="row-container1"
          onClick={() => handleTodoClick(todo.to_do_id)}
        >
          <button
            className="completeBtn"
            title={`Change completion status`}
            onClick={(event) => {
              clickTodoComplete(event, todo.to_do_id);
            }}
          >
            {todo.to_do_complete ? (
              <FiCheckCircle style={{ color: "#2b334a", fontSize: "2rem" }} />
            ) : (
              <FiCircle style={{ color: "#2b334a", fontSize: "2rem" }} />
            )}
          </button>
          <div className="todo2">{todo.to_do_name}</div>
          {todo.username && <div className="owner">{todo.username}</div>}
        </div>
      ))
    : null;

  return (
    <>
      <NavBar />
      <div>{<Map trip_id={pageTrip_id} />}</div>
      <div
        className="trip-name"
        onClick={() => {
          setTripModalIsShown(true);
        }}
      >
        {trip.trip_name}
        <MdEdit />
      </div>
      <div className="trip-lists">
        <div className="trip-list">
          <div className="header-container1">
            <div className="td-header">DONE</div>
            <div className="td-header">TO DO</div>
            <div className="owner td-header">OWNER</div>
          </div>
          <div className="table-container1">{todos}</div>
          <button
            className="to-do-btn"
            onClick={() => {
              setTodoModalIsShown(true);
              setTodoData({});
            }}
          >
            Add To-Do
          </button>
        </div>
        <div className="trip-list">
          <div className="header-container1"></div>
        </div>
      </div>

      <div>
        {tripModalIsShown && (
          <TripModal
            tripData={trip}
            onDelete={handleDeleteTrip}
            onClose={handleCloseTripModal}
            onSaveChanges={handleSaveTripChanges}
          />
        )}
      </div>
      <div>
        {todoModalIsShown && (
          <ToDoModal
            todoData={todoData}
            onDelete={handleDeleteTodo}
            onClose={handleCloseTodoModal}
            onSaveChanges={handleSaveChanges}
          />
        )}
      </div>
    </>
  );
}
