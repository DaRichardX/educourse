"use client";

import React, { useState, useEffect } from "react";
import RegistrationNav from "./registrationNav";
import RegistrationHero from "./registrationHero";
import RegistrationGrid from "./RegistrationGrid";
import { Footer } from "../marketing/layout/footer";
import { X } from "@phosphor-icons/react";
import "./registration.css";
import Button from "@mui/material/Button";

const classrooms = {
  room101: {
    teacher: "Ms. Johnson",
    students: [
      {
        name: "Alice",
        presentation: "The impact of climate change on polar bears",
      },
      { name: "Bob", presentation: "The history of the Silk Road" },
      { name: "Charlie", presentation: "How rockets work" },
      { name: "Diana", presentation: "My relationship and the lessons learnt" },
    ],
    fullCapacity: 30,
    currentOccupancy: 12,
  },
  room102: {
    teacher: "Mr. Smith",
    students: [
      { name: "Ethan", presentation: "Quantum computing explained" },
      { name: "Fiona", presentation: "The psychology of decision-making" },
      { name: "George", presentation: "The rise of electric vehicles" },
      { name: "Hannah", presentation: "Artificial intelligence in healthcare" },
    ],
    fullCapacity: 25,
    currentOccupancy: 18,
  },
  room103: {
    teacher: "Mrs. Brown",
    students: [
      { name: "Ian", presentation: "The history of the Roman Empire" },
      { name: "Julia", presentation: "Marine biology and ocean conservation" },
      { name: "Kyle", presentation: "The basics of blockchain technology" },
      {
        name: "Laura",
        presentation: "The impact of fast fashion on the environment",
      },
      { name: "Mark", presentation: "How video games affect cognitive skills" },
    ],
    fullCapacity: 35,
    currentOccupancy: 22,
  },
  room104: {
    teacher: "Dr. Green",
    students: [
      { name: "Nina", presentation: "The physics behind roller coasters" },
      { name: "Oliver", presentation: "The future of space travel" },
      { name: "Paula", presentation: "How music influences human emotions" },
      { name: "Quentin", presentation: "The evolution of digital marketing" },
    ],
    fullCapacity: 28,
    currentOccupancy: 16,
  },
  room105: {
    teacher: "Ms. White",
    students: [
      { name: "Ryan", presentation: "The role of genetics in disease" },
      { name: "Sophia", presentation: "The mathematics of infinity" },
      {
        name: "Tom",
        presentation: "The impact of artificial intelligence on jobs",
      },
      { name: "Uma", presentation: "The chemistry behind fireworks" },
    ],
    fullCapacity: 40,
    currentOccupancy: 30,
  },
};

export default function Registration({ id }) {
  console.log(id);

  // do something with the id here
  const [user, setUser] = useState({ name: "Richard" });
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedRoom, setHighlightedRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [registeredRoom, setRegisteredRoom] = useState(null);
  const registerUser = () => {
    if (registeredRoom) return; // Prevent registering again

    const confirmRegister = window.confirm(
      "Are you sure you want to register? You cannot change your choice once confirmed.",
    );

    if (confirmRegister) {
      setRegisteredRoom(selectedRoom);
      setIsModalOpen(false);
      console.log("User registered for:", selectedRoom);
    }
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    setIsModalOpen(false);
    if (e.type === "keydown" && e.key === "Escape") setIsModalOpen(false);
  };

  const randomizeRoom = () => {
    const roomKeys = Object.keys(classrooms);
    const randomRoom = roomKeys[Math.floor(Math.random() * roomKeys.length)];
    setHighlightedRoom(randomRoom);
    setSelectedRoom(randomRoom);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.84; // 84vh

      if (scrollPosition > triggerPoint && !hasScrolledPastHero) {
        setHasScrolledPastHero(true);
      } else if (scrollPosition <= triggerPoint && hasScrolledPastHero) {
        setHasScrolledPastHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolledPastHero]);

  return (
    <div className="reg-page">
      <RegistrationNav
        user={user}
        hasScrolledPastHero={hasScrolledPastHero}
        randomizeRoom={randomizeRoom}
      />
      <RegistrationHero user={user} />

      <section className="schedule-section">
        <h2>Capstone Presentation Rooms</h2>
        <RegistrationGrid
          classrooms={classrooms}
          highlightedRoom={highlightedRoom}
          openModal={openModal}
          closeModal={closeModal}
          registeredRoom={registeredRoom}
        />
      </section>

      {isModalOpen && (
        <PresenterModal
          selectedRoom={selectedRoom}
          closeModal={closeModal}
          registerUser={registerUser}
        />
      )}

      <Footer />
    </div>
  );
}

function PresenterModal({ selectedRoom, closeModal, registerUser }) {
  return (
    <div
      className="modal-overlay"
      role="button"
      tabIndex="0"
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") closeModal(e);
      }}
    >
      <div className="modal-content">
        <button
          type="button"
          className="modal-close-button"
          onClick={closeModal}
        >
          <X size={24} weight="bold" />
        </button>
        <div>
          <h3>{classrooms[selectedRoom].teacher}'s Room</h3>
          <ul style={{ lineHeight: "1.5", marginTop: "25px" }}>
            {classrooms[selectedRoom].students.map((student, idx) => (
              <li key={idx} style={{ marginTop: "10px" }}>
                {student.name}: {student.presentation}
              </li>
            ))}
          </ul>
        </div>
        <div className="register-content">
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "grey",
              marginRight: "10px",
            }}
          >
            {classrooms[selectedRoom].currentOccupancy} /{" "}
            {classrooms[selectedRoom].fullCapacity}
          </span>

          <Button size="large" variant="contained" onClick={registerUser}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
