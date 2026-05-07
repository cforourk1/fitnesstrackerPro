import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getActivity } from "../api/activities";
/** useParams is a hook that looks at the current url and hands back the dynamic parts., this is how *we will be able to identify which activity we are on. That will display in the URL. And that is how *we will be able to navigate to a specific activity rather than the entire list of activities.
 * */
export default function ActivityPage() {
//get the activity ID
    const { id } = useParams()
//store the activity ID once it is fetched
    const [activity, setActivity] = useState(null)
const syncActivity = async () => {
const data = await getActivity(id);
setActivity(data);
};
useEffect(() => {
    syncActivity();
}, [id]);
  return (
    <>
    {activity && (
    <div>
    <h1>{activity.name}</h1>
    <p>{activity.description}</p>
    <p>{activity.creatorName}</p>
    </div>
  )}
  </>
  );
}