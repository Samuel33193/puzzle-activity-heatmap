import { useState, useEffect, useRef } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import Dashboard from "./Dashboard";

import { saveActivity, loadActivity } from "./db/activityService";

function App() {

  const [activity, setActivity] = useState(Array(365).fill(0));

  const heatmapRef = useRef(null);

  useEffect(() => {

    async function fetchData(){
      const data = await loadActivity();
      setActivity(data);
    }

    fetchData();

  }, []);

  const toggleCell = async (index) => {

    const updated = [...activity];

    updated[index] = updated[index] === 4 ? 0 : updated[index] + 1;

    setActivity(updated);

    await saveActivity(updated);

  };

  const downloadImage = async () => {

    const canvas = await html2canvas(heatmapRef.current);

    const link = document.createElement("a");

    link.download = "puzzle-heatmap.png";

    link.href = canvas.toDataURL();

    link.click();

  };

  /* ----------- STATS CALCULATION ----------- */

  const totalActiveDays = activity.filter(v => v > 0).length;

  let currentStreak = 0;
  let longestStreak = 0;
  let temp = 0;

  activity.forEach(v => {

    if(v > 0){
      temp++;
      longestStreak = Math.max(longestStreak, temp);
    } else {
      temp = 0;
    }

  });

  for(let i = activity.length - 1; i >= 0; i--){
    if(activity[i] > 0){
      currentStreak++;
    } else {
      break;
    }
  }

  return (

    <div className="container">

      <h1>Puzzle Activity Heatmap</h1>

      <div className="stats">

        <p>🔥 Current Streak: {currentStreak} days</p>
        <p>🏆 Longest Streak: {longestStreak} days</p>
        <p>📅 Total Active Days: {totalActiveDays}</p>

      </div>

      <div ref={heatmapRef}>
        <Dashboard activity={activity} toggle={toggleCell} />
      </div>

      <button className="downloadBtn" onClick={downloadImage}>
        Download Heatmap
      </button>

    </div>

  );

}

export default App;