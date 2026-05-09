import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getRoutines } from "../api/routines";
import "./gritty.css";
import barbieGritty from "../grittyPics/barbieGritty.png";
import grittyTurkey from "../grittyPics/grittyTurkey.png";
import trueGrit from "../grittyPics/trueGrit.png";
import flyersLogo from "../grittyPics/flyersLogo.png";

export default function GrittyRoutine() {
  // get token authentication
  const { token } = useAuth();
  //store the Routine ID once it is fetched
  const [Routine, setRoutine] = useState(null);
  //state for animation
  const [activeSet, setActiveSet] = useState(null);
  //error state
  const [error, setError] = useState(null);
  //Gritty image objects
  const grittyImages = {
    661: barbieGritty,
    663: grittyTurkey,
    664: trueGrit,
  };
  //render sync Routine and get the data from the api
  const syncRoutine = async () => {
    const data = await getRoutines();
    const found = data.find((r) => r.id === 266);
    console.log(found.sets);
    setRoutine(found);
  };
  useEffect(() => {
    syncRoutine();
  }, []);
return (
  <div className="pageWrapper">
    <div className="sidebar">
      <h1>Gritty's Workout</h1>
      {Routine && (
        <>
          <h2>{Routine.name}</h2>
          <p>{Routine.goal}</p>
          <ul>
            {Routine.sets.map((activity) => (
              <button key={activity.id} onClick={() => setActiveSet(activity.activityId)}>
                {activity.name} x {activity.count}
              </button>
            ))}
          </ul>
        </>
      )}
      <img src={flyersLogo} className="flyersLogo" />
    </div>
    <div className="center">
      {activeSet && <img src={grittyImages[activeSet]} className="grittyPic" />}
    </div>
  </div>
);