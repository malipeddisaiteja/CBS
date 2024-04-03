import React from "react";
import Navbar from "./Navbar";
import EmpNavBar from "./EmpNavBar";

export default function Empdashboard(props) {
  return (
    <div>
      <EmpNavBar />
      <br></br>
      <br></br>
      <h1>Employee Dashboard : {props.empid}</h1>
    </div>
  );
}
