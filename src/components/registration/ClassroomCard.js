import React, { useState } from "react";
import { Info } from "@phosphor-icons/react";

export default function ClassroomCard({ room, data, closeModal, openModal }) {
  return (
    <div className="classroom-card">
      <div className="room-header">
        <h3>{room.toUpperCase()}</h3>
        <Info
          className="info-icon"
          size={20}
          weight="bold"
          role="button"
          onClick={openModal}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openModal();
          }}
        />
      </div>

      <p className="teacher-name">{data.teacher}</p>

      <div className="bottom-row">
        <button className="register-btn">Register</button>
        <p className="capacity">
          {data.currentOccupancy}/{data.fullCapacity}
        </p>
      </div>
    </div>
  );
}
