import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ activity }) {

  const weeklyData = activity.slice(-7);

  const data = {
    labels: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    datasets: [
      {
        label: "Puzzles Solved",
        data: weeklyData,
        backgroundColor: "#4caf50"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Weekly Puzzle Activity"
      }
    }
  };

  return (
    <div style={{ width: "600px", margin: "40px auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Dashboard;