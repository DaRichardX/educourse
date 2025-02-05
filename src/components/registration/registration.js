import React, { useState, useEffect } from "react";
import RegistrationNav from "./registrationNav";
import RegistrationHero from "./registrationHero";
import "./registration.css";

export default function Registration() {
  const [user, setUser] = useState({
    name: "Richard",
  });
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  // get user name from UID

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
        <p>Find out when and where each project will be showcased.</p>
      </section>
    </div>
  );
}
