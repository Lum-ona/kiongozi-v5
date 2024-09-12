import React from "react";

import "./assets/styles/Leftside.css";
import Piechart from "../explore/graphs/Piechart";
import ComposedGraph from "../explore/graphs/ComposedGraph";

function Leftside() {
  return (
    <div className="leftside mt-5 shadow-lg pt-3">
      <h4>Statistics</h4>
      <div className="graphs mt-4">
        <ComposedGraph />
        <div className="mt-4">
          <Piechart />
        </div>
      </div>
    </div>
  );
}

export default Leftside;
