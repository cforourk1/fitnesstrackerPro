import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { deleteRoutine, getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import  SetForm from "./SetForm";
/** useParams is a hook that looks at the current url and hands back the dynamic parts., this is how *we will be able to identify which Routine we are on. That will display in the URL. And that is how *we will be able to navigate to a specific Routine rather than the entire list of activities.
 * */
export default function RoutinePage() {
  const navigate = useNavigate();
  //get the Routine ID
  const { id } = useParams();
  // get token authentication
  const { token } = useAuth();
  //store the Routine ID once it is fetched
  const [Routine, setRoutine] = useState(null);
  //error state
  const [error, setError] = useState(null);
  //render sync Routine and get the data from the api
  const syncRoutine = async () => {
    const data = await getRoutines();
    const found = data.find((r) => r.id === Number(id));
    setRoutine(found);
  };
  useEffect(() => {
    syncRoutine();
  }, [id]);
  const tryDelete = async () => {
    setError(null);
    //see if Routine can be deleted. does token for Routine match current user logged in
    try {
      await deleteRoutine(token, Routine.id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      {Routine && (
        <div>
          <h1>{Routine.name}</h1>
          <p>{Routine.goal}</p>
          <p>{Routine.creatorName}</p>
          <h2>Sets</h2>
          {Routine.sets.length === 0 ? (
            <p>No sets yet! Add one below.</p>
          ) : (
            <ul>
              {Routine.sets.map((set) => (
                <li key={set.id}>
                  {set.name} x {set.count}
                </li>
              ))}
            </ul>
          )}
          {token && <SetForm routineId={Routine.id} syncSets={syncRoutine} />}
          {token && <button onClick={tryDelete}>Delete</button>}
          {error && <p role="alert">{error}</p>}
        </div>
      )}
    </>
  );
}
