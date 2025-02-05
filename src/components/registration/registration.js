import React, { useState, useEffect } from "react";
import RegistrationNav from "./registrationNav";
import RegistrationHero from "./registrationHero";
import "./registration.css";
import { onAuthStateChanged } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export default function Registration() {
  const auth = getFirebaseAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "audience",
          photo: currentUser.photoURL || "",
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="reg-page">
      <RegistrationNav
        isLoading={isLoading}
        user={user}
        hasScrolledPastHero={hasScrolledPastHero}
      />
      <RegistrationHero user={user} />

      <section className="schedule-section">
        <h2>Capstone Presentation Schedule</h2>
        <p>Find out when and where each project will be showcased.</p>
      </section>
    </div>
  );
}
