import React from "react";
import { Icon } from "@iconify/react";
import "./BathroomPin.css";
const BathroomPin = ({ text }) => (
  <div className="pin">
    <Icon icon="cil:toilet" className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

export default BathroomPin;
