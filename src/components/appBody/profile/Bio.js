import React from "react";
import "./assets/styles/bio.css";

const Bio = ({ data }) => {
  return (
    <div className="bio_cont">
      <div className="bio_title">
        <span>
          <span>Bio</span>
        </span>
      </div>
      <div className="bio_info">
        <div className="personal_info">
          <span>
            <span className="info_category">Aspirancy</span>
            <span className="info_data">{data.aspirancy.toUpperCase()}</span>
          </span>
          <span>
            <span className="info_category">Political Party</span>
            <span className="info_data">{data.politicalParty}</span>
          </span>
          <span>
            <span className="info_category">Age</span>
            <span className="info_data">{data.age} years</span>
          </span>
        </div>
        <div className="location_info">
          <span>
            <span className="info_category">County</span>
            <span className="info_data">
              {data.location.county.toUpperCase()}
            </span>
          </span>
          <span>
            <span className="info_category">Constituency</span>
            <span className="info_data">
              {data.location.constituency.toUpperCase()}
            </span>
          </span>
          <span>
            <span className="info_category">Ward</span>
            <span className="info_data">
              {data.location.ward.toUpperCase()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Bio;
