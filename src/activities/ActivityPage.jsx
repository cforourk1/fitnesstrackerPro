import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivity } from "../api/activities";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";
/** useParams is a hook that looks at the current url and hands back the dynamic parts., this is how *we will be able to identify which activity we are on. That will display in the URL. And that is how *we will be able to navigate to a specific activity rather than the entire list of activities.
 * */
export default function ActivityPage() {
    const navigate = useNavigate();
//get the activity ID
    const { id } = useParams()
// get token authentication
    const { token } = useAuth();
//store the activity ID once it is fetched
    const [activity, setActivity] = useState(null)
//error state
const [error, setError] = useState(null);
//render sync activity and get the data from the api
const syncActivity = async () => {
//navigate bacj to activity
const data = await getActivity(id);
//set the current activity to data from API
setActivity(data);
};
useEffect(() => {
    syncActivity();
}, [id]);
const tryDelete = async () => {
    setError(null);
//see if activity can be deleted. does token for activity match current user logged in
    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
    {activity && (
    <div>
    <h1>{activity.name}</h1>
    <p>{activity.description}</p>
    <p>{activity.creatorName}</p>
    {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </div>
  )}
  </>
  );
}