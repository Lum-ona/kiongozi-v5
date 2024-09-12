import React from "react";
import Header from "../components/header/Header";
import Leftside from "../components/appBody/leftside/Leftside";
import Main from "../components/appBody/main/Main";
import Rightside from "../components/appBody/rightside/Rightside";
import "../styles/Index.css";

const Index = () => {
  return (
    <React.Fragment>
      <div className="index">
        <Header />
        <div className="index_body mt-5 mx-3">
          <Leftside />
          <Main />
          <Rightside />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
