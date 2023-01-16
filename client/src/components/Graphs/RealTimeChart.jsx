import React, { useState, useEffect } from "react";
import { Line } from "@nivo/line";

const RealTimeLineChart = () => {
  const [data, setData] = useState([{ x: 0, y: 0 }]);

  useEffect(() => {
    let x = 0;
    const intervalId = setInterval(() => {
      // update data with new random value
      setData((data) => [...data, { x: x++, y: Math.random() * 100 }]);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Line
      data={data}
      xScale={{ type: "linear" }}
      yScale={{ type: "linear", min: 0, max: 100 }}
      curve="monotoneX"
      axisBottom={{
        tickValues: "every 2 minutes",
        legend: "Time",
        legendPosition: "middle",
        legendOffset: 46,
      }}
      axisLeft={{
        legend: "Value",
        legendPosition: "middle",
        legendOffset: -60,
      }}
    />
  );
};

export default RealTimeLineChart;
