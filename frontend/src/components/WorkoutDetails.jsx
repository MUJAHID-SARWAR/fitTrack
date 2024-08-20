import { useState } from 'react';
import { UseWorkoutContext } from "../hooks/UseWorkoutContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = UseWorkoutContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);

  const handleClickDelete = async () => {
    const response = await fetch('https://fittrack-z4vj.onrender.com/api/workouts/' + workout._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  const handleClickUpdate = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('https://fittrack-z4vj.onrender.com/api/workouts/' + workout._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, load, reps })
      });

      const responseText = await response.text();
      console.log(responseText);  // Log the raw response text

      const json = JSON.parse(responseText);  // Parse the response text as JSON

      if (response.ok) {
        dispatch({ type: 'UPDATE_WORKOUT', payload: json });
        setIsEditing(false);
      } else {
        console.error('Failed to update workout:', json);
      }
    } catch (error) {
      console.error('An error occurred while updating the workout:', error);
    }
  };

  return (
    <div className="workout-details">
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <label>Load (kg):</label>
          <input 
            type="number" 
            value={load} 
            onChange={(e) => setLoad(e.target.value)} 
          />
          <label>Reps:</label>
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)} 
          />
          <button className="primary" onClick={handleUpdate}>Save</button>
          <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{workout.title}</h4>
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <span className="material-symbols-outlined danger" onClick={handleClickDelete}>Delete</span>
          <button className="primary" onClick={handleClickUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
