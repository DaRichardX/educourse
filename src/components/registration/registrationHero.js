import React from "react";
import { CaretDown } from "@phosphor-icons/react"; // Phosphor scroll-down icon

export default function RegistrationHero({ name }) {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>
            Welcome,{" "}
            <span className="clipped-text">{name || "student"}</span>
          </h1>
        </div>

        <div className="scroll-down-cta">
          <p>Scroll down to explore the Capstone schedule</p>
          <CaretDown className="scroll-icon" weight="bold" />
        </div>
      </div>
      <div className="hero-clip-curve"></div>
    </>
  );
}
