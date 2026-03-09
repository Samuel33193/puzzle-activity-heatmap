import React from "react";

function Dashboard({ activity, toggle, year }) {

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const startDate = new Date(year, 0, 1);

  const getDate = (index) => {

    const date = new Date(startDate);

    date.setDate(startDate.getDate() + index);

    return date.toDateString();

  };

  const getColor = (value) => {

    switch(value){
      case 0: return "cell level0";
      case 1: return "cell level1";
      case 2: return "cell level2";
      case 3: return "cell level3";
      case 4: return "cell level4";
      default: return "cell";
    }

  };

  return (

    <div className="heatmap-wrapper">

      {/* MONTH LABELS */}

      <div className="months">

        {months.map((m,i)=>(
          <span key={i}>{m}</span>
        ))}

      </div>

      <div className="heatmap">

        {/* DAYS COLUMN */}

        <div className="days">

          {days.map((d,i)=>(
            <span key={i}>{d}</span>
          ))}

        </div>

        {/* GRID */}

        <div className="grid">

          {activity.map((value,index)=>(
            <div
              key={index}
              className={getColor(value)}
              onClick={()=>toggle(index)}
              title={`${value} activity on ${getDate(index)}`}
            />
          ))}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;