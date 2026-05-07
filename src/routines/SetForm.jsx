import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { createSet } from "../api/routines";
import { getActivities } from "../api/activities";

/** Form for a user to add a new set to a routine. */
export default function SetForm({ syncSets, routineId }) {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    loadActivities();
  }, []);

  const tryCreateSet = async (formData) => {
    setError(null);
    const activityId = Number(formData.get("activityId"));
    const count = Number(formData.get("count"));

    try {
      await createSet(token, { activityId, routineId, count });
      syncSets();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Add a new Set</h2>
      <form action={tryCreateSet}>
        <label>
          Activity
          <select name="activityId">
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" name="count" />
        </label>
        <button>Add Set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
