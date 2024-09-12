import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

function ComposedGraph() {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.2); // Initial width based on 30vw

  // Update width when the window resizes
  useEffect(() => {
    const handleResize = () => setChartWidth(window.innerWidth * 0.2);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const composedData = [
    {
      name: "2009",
      // registered: 14.3,
      Youths: 10.22,
      population: 40.9,
      // cnt: 490,
    },
    {
      name: "2013",
      registered: 14.3,
      Youths: 11.38,
      population: 45.52,
      // cnt: 590,
    },
    {
      name: "2017",
      Youths: 12.55,
      population: 50.22,
      registered: 19.6,

      // cnt: 350,
    },
    {
      name: "2019",

      Youths: 13.13,
      population: 52.54,
      // cnt: 480,
    },
    {
      name: "2022",
      registered: 20.02,
      Youths: 13.15,
      population: 52.6,
      // cnt: 460,
    },
  ];
  return (
    <div className="container" style={{ fontSize: "11px" }}>
      <ComposedChart width={chartWidth} height={200} data={composedData}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="population"
          fill="green"
          stroke="green"
        />
        <Bar dataKey="registered" barSize={10} fill="#111" />
        <Line type="monotone" dataKey="Youths" stroke="red" />
        <Scatter dataKey="" fill="red" />
      </ComposedChart>
    </div>
  );
}

export default ComposedGraph;
