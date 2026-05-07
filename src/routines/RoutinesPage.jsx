import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getRoutines } from "../api/routines";

import RoutineList from "./RoutineList";
import RoutineForm from "./RoutineForm";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
 const { token } = useAuth();
  const syncRoutines
   = async () => {
    const data = await getRoutines
    ();
    setRoutines(data);
  };

  useEffect(() => {
    syncRoutines
    ();
  }, []);

  return (
    <>
      <h1>Routines</h1>
      {token && <RoutineForm syncRoutines={syncRoutines} />}
      <RoutineList routines={routines} syncRoutines={syncRoutines} />
    </>
  );
}