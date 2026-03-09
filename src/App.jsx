import { useState, useRef } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import Dashboard from "./Dashboard.jsx";

function App() {

  const savedData = JSON.parse(localStorage.getItem("activity")) || Array(365).fill(0);
  const [activity, setActivity] = useState(savedData);

  const [darkMode, setDarkMode] = useState(false);

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

  const months = [];
  const current = new Date(startDate);

  for (let i = 0; i < 365; i += 30) {
    months.push(
      current.toLocaleString("default", { month: "short" })
    );
    current.setMonth(current.getMonth() + 1);
  }

  return (
    <div className={darkMode ? "dark" : ""}>

      <div className="top-buttons">
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>

        <button onClick={downloadImage}>
          Download Heatmap
        </button>
      </div>

      <h2>Puzzle Activity Heatmap</h2>

      <h3>🔥 Current Streak: {streak} days</h3>
      <h3>🧩 Total Puzzles Solved: {totalPuzzles}</h3>

      <div ref={heatmapRef}>

        <div className="months">
          {months.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>

        <div className="heatmap-wrapper">

          <div className="days">
            {days.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          <div className="heatmap-container">

            <div className="heatmap">

              {Array.from({ length: startDay }).map((_, i) => (
                <div key={"empty"+i} className="cell"></div>
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

        <div className="legend">
          <span>Less</span>
          <div className="cell"></div>
          <div className="cell level1"></div>
          <div className="cell level2"></div>
          <div className="cell level3"></div>
          <div className="cell level4"></div>
          <span>More</span>
        </div>

      </div>

      <Dashboard activity={activity} />

    </div>
  );
}

export default App;