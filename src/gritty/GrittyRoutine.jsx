import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getRoutines } from "../api/routines";
import "./gritty.css";
import barbieGritty from "../grittyPics/barbieGritty.png";
import grittyTurkey from "../grittyPics/grittyTurkey.png";
import trueGrit from "../grittyPics/trueGrit.png";
import flyers from "../grittyPics/flyers.png";
import gritHouse from "../grittyPics/gritHouse.png";

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
  //gritty animations object
  const grittyAnimations = {
    661: "grittyTwirl",
    663: "grittyShake",
    664: "grittyWreck",
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
      {Routine && (
        <>
          <h3>{Routine.name}</h3>
          <p>Goal: {Routine.goal}</p>
            {Routine.sets.map((activity) => (
              <button key={activity.id} onClick={() => setActiveSet(activity.activityId)}>
                {activity.name}
              </button>
            ))}
        </>
      )}
      <img src={flyers} className="flyers" />
    </div>
    <div className="center">
      {activeSet && <img src={grittyImages[activeSet]} className="grittyPic" />}
      <img src={gritHouse} className="gritHouse" />
    </div>
  </div>
);

}