import { useState } from "react";
import { deleteRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";



export default function RoutineList({ routines, syncRoutines }) {
  return (
    <ul>
      {routines.map((Routine) => (
        <RoutineListItem
          key={Routine.id}
          Routine={Routine}
          syncRoutines={syncRoutines}
        />
      ))}
    </ul>
  );
}

function RoutineListItem({ Routine, syncRoutines }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteRoutine(token, Routine.id);
      syncRoutines();
    } catch (e) {
      setError(e.message);
    }
  };
//added link to for the Routine ID
  return (
    <li>
      <Link to={`/routines/${Routine.id}`}>{Routine.name}</Link>
    </li>
  );
}
