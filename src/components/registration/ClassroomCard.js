import React from "react";
import "./registration.css"; // Ensure you import the CSS file

export default function ClassroomCard({ room, data, closeModal, openModal, highlighted, registeredRoom }) {
  const isRegistered = registeredRoom === room;

  return (
    <div className={`classroom-card ${highlighted ? "highlighted" : ""}`}>
      <div className="room-header">
        <h3>{room.toUpperCase()}</h3>
      </div>

      <p className="teacher-name">{data.teacher}</p>

      <div className="bottom-row">
        <button
          className={`register-btn ${registeredRoom ? (isRegistered ? "registered" : "disabled") : ""}`}
          disabled={!!registeredRoom}
          onClick={() => openModal(room)}
        >
          {isRegistered ? "Registered" : "Register"}
        </button>
      </div>
    </div>
  );
}
