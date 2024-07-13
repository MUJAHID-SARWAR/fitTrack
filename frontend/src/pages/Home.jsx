import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import { useEffect } from "react"
import {UseWorkoutContext} from '../hooks/UseWorkoutContext'


const Home = () => {
 const {workouts, dispatch} = UseWorkoutContext()

  useEffect(() =>{
      const fetchWorkout = async () => {
         const reponse = await fetch('http://localhost:4000/api/workouts')
         const json = await reponse.json()

         if(reponse.ok) {

          dispatch({type: 'SET_WORKOUTS', payload: json})
         }

      }

      fetchWorkout()
  }, [dispatch])
  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
         <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
