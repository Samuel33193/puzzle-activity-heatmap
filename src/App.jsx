import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAllActivity, saveActivity } from "./db/activityService";

function App() {

  const startOfYear = dayjs().startOf("year");

  const [activityMap, setActivityMap] = useState({});

  const days = [];

  for (let i = 0; i < 365; i++) {
    days.push(startOfYear.add(i, "day"));
  }

  useEffect(() => {

    async function loadActivity() {

      const data = await getAllActivity();

      const map = {};

      data.forEach(a => {
        map[a.date] = a;
      });

      setActivityMap(map);

    }

    loadActivity();

  }, []);

  function getColor(date) {

    const activity = activityMap[date];

    if (!activity) return "#ebedf0";

    const score = activity.score;

    if (score < 50) return "#c6e48b";
    if (score < 100) return "#7bc96f";
    if (score < 150) return "#239a3b";

    return "#196127";

  }

  async function markSolved(date) {

    const score = Math.floor(Math.random() * 200);

    await saveActivity({
      date,
      solved: true,
      score
    });

    const updated = { ...activityMap };

    updated[date] = { solved: true, score };

    setActivityMap(updated);

  }

  // 🔥 STREAK FUNCTION
  function calculateStreak(activityMap) {

    let streak = 0;
    let current = dayjs();

    while (activityMap[current.format("YYYY-MM-DD")]?.solved) {
      streak++;
      current = current.subtract(1, "day");
    }

    return streak;
  }

  const streak = calculateStreak(activityMap);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Puzzle Activity Heatmap</h1>

      <h2>🔥 Current Streak: {streak} days</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(53, 12px)",
          gap: "4px",
          marginTop: "20px"
        }}
      >
        {days.map((day, i) => {

          const date = day.format("YYYY-MM-DD");

          return (
            <div
              key={i}
              title={date}
              onClick={() => markSolved(date)}
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: getColor(date),
                borderRadius: "2px",
                cursor: "pointer"
              }}
            />
          );

        })}
      </div>
    </div>
  );
}

export default App;