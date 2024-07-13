import { useContext } from "react"
import { WorkoutContext } from "../context/WorkoutContext"



 export const UseWorkoutContext = () => {
    const context = useContext(WorkoutContext)

    if (!context) {
        throw Error ('UseWorkoutContext must be used inside an WorkoutContextProvider')
    }

    return context
}

