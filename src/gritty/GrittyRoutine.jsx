import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getRoutines } from "../api/routines";



export default function GrittyRoutine() {
  // get token authentication
  const { token } = useAuth();
  //store the Routine ID once it is fetched
  const [Routine, setRoutine] = useState(null);
  //state for animation
  const [activeSet, setActiveSet] = useState(null);
  //error state
  const [error, setError] = useState(null);
  //render sync Routine and get the data from the api
  const syncRoutine = async () => {

    const data = await getRoutines();
      const found = data.find((r) => r.id === 266);
    setRoutine(found);
  };
  useEffect(() => {
    syncRoutine();
  }, []);
  return (
  <div>
    <h1>Gritty's Workout</h1>
    {Routine && (
      <div>
        <h2>{Routine.name}</h2>
        <p>{Routine.goal}</p>
        <ul>
          {Routine.sets.map((set) => (
            <button key={set.id}>
              {set.name} x {set.count}
            </button>
          ))}
        </ul>
      </div>
    )}
  </div>
);
}