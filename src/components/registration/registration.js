"use client";

import React, { useState, useEffect } from "react";
import RegistrationNav from "./registrationNav";
import RegistrationHero from "./registrationHero";
import RegistrationGrid from "./RegistrationGrid";
import { Footer } from "../marketing/layout/footer";
import { X } from "@phosphor-icons/react";
import "./registration.css";
import { logger } from '@/lib/default-logger';
import Button from "@mui/material/Button";
import { useCapstoneSelections } from "@/queries/capstone-queries";

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
      {
        name: "Ethan",
        presentation:
          "Quantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computinguantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explainedQuantum computing explained",
      },
      {
        name: "Fiona",
        presentation:
          "The psychology of decision-makinsychology of decision-makinsychology of decision-makinsychology of decision-makinsychology of decision-making",
      },
      {
        name: "George",
        presentation:
          "The rise of electric veh rise of electric veh rise of electric veh rise of electric veh rise of electric veh rise of electric vehicles",
      },
      {
        name: "Hannah",
        presentation:
          "Artificial intelligence iicial intelligence iicial intelligence iicial intelligence iicial intelligence iicial intelligence iicial intelligence iicial intelligence iicial intelligence in healthcare",
      },
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

export default function Registration({ orgId, signupId }) {
  logger.debug("Org ID:", orgId);
  logger.debug("Signup ID:", signupId);

  const {data: selections, isLoading: isSelectionsLoading} = useCapstoneSelections({orgId, signupId});
  useEffect(() => {
    if (isSelectionsLoading) {
      logger.debug("Loading Selections...");
    } else {
      logger.debug("Selections Data:", selections);
    }
  }, [isSelectionsLoading, selections]);

  // do something with the id here
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
    isSelectionsLoading ? (
      <div className="loading-screen">
        <h1>Loading...</h1>
        <p>Please wait while we fetch your data.</p>
      </div>
    ) : (
    <div className="reg-page">
      <RegistrationNav
        user={selections.student_id}
        hasScrolledPastHero={hasScrolledPastHero}
        randomizeRoom={randomizeRoom}
      />
      <RegistrationHero name={selections.student_id} />

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
    )
  );
}

function PresenterModal({ selectedRoom, closeModal, registerUser }) {
  return (
    <div
      className="modal-overlay"
      role="button"
      tabIndex="0"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
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

        <div style={{ padding: "0px 40px 30px 40px" }}>
          <h3 style={{ margin: 0, fontSize: "1.8rem" }}>
            {classrooms[selectedRoom].teacher}'s Room
          </h3>
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
