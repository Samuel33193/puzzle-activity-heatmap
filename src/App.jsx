import { useState, useRef } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import Dashboard from "./Dashboard.jsx";

function App() {

  const savedData =
    JSON.parse(localStorage.getItem("activity")) || Array(365).fill(0);

  const [activity, setActivity] = useState(savedData);

  const heatmapRef = useRef(null);

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 364);
  const startDay = startDate.getDay();

  const handleClick = (index) => {
    const newActivity = [...activity];
    newActivity[index] = (newActivity[index] + 1) % 5;

    setActivity(newActivity);
    localStorage.setItem("activity", JSON.stringify(newActivity));
  };

  const downloadImage = () => {
    html2canvas(heatmapRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "puzzle-heatmap.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  let streak = 0;
  for (let i = activity.length - 1; i >= 0; i--) {
    if (activity[i] > 0) streak++;
    else break;
  }

  const totalPuzzles = activity.reduce((sum, val) => sum + val, 0);

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  return (
    <div>

      <h1>Puzzle Activity Heatmap</h1>

      <h3>🔥 Current Streak: {streak} days</h3>
      <h3>🧩 Total Puzzles Solved: {totalPuzzles}</h3>

      <button onClick={downloadImage}>Download Heatmap</button>

      <div ref={heatmapRef}>

        {/* Months */}
        <div className="months">
          {months.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>

        <div className="heatmap-wrapper">

          {/* Days */}
          <div className="days">
            {days.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>

          {/* Heatmap */}
          <div className="heatmap-container">

            <div className="heatmap">

              {Array.from({ length: startDay }).map((_, i) => (
                <div key={"empty" + i} className="cell"></div>
              ))}

              {activity.map((level, index) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + index);

                return (
                  <div
                    key={index}
                    className={`cell level${level}`}
                    onClick={() => handleClick(index)}
                    title={`${date.toDateString()} - ${level} puzzles`}
                  ></div>
                );
              })}

            </div>

          </div>

        </div>

      </div>

      <Dashboard activity={activity} />

    </div>
  );
}

export default App;