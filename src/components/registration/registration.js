import React, { useState, useEffect } from "react";
import RegistrationNav from "./registrationNav";
import RegistrationHero from "./registrationHero";
import RegistrationGrid from "./RegistrationGrid";
import ClassroomCard from "./ClassroomCard";
import { Footer } from "../marketing/layout/footer";
import "./registration.css";

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
      { name: "Diana", presentation: "The evolution of human language" },
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

export default function Registration() {
  const [user, setUser] = useState({
    name: "Richard",
  });
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
    }
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
      <RegistrationNav user={user} hasScrolledPastHero={hasScrolledPastHero} />
      <RegistrationHero user={user} />

      <section className="schedule-section">
        <h2>Capstone Presentation Schedule</h2>
        <RegistrationGrid
          classrooms={classrooms}
          openModal={openModal}
          closeModal={closeModal}
        />
      </section>

      <Footer />
    </div>
  );
}
