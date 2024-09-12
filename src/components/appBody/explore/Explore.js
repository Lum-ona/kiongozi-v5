import React from "react";
import ComposedGraph from "./graphs/ComposedGraph";
import Piechart from "./graphs/Piechart";
import CivicEducation from "./CivicEducation";
import Pdf from "./Pdf";
import "./assets/styles/Explore.css";

function Explore() {
  return (
    <>
      {/* <Pdf /> */}
      <ul class="nav nav-tabs " id="myTab" role="tablist">
        <li class="nav-item " role="presentation">
          <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Civic Education
          </button>
        </li>
        <li
          class="stats_nav nav-item d-lg-none .d-xl-block "
          role="presentation"
        >
          <button
            class="nav-link"
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Statistics
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <CivicEducation className="" />
        </div>
        {/* <div
          class="tab-pane fade "
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <ComposedGraph />
          <Piechart />
        </div> */}
      </div>
    </>
  );
}

export default Explore;
